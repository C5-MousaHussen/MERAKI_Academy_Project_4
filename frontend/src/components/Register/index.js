import React, { useState } from "react";
import "./style.css";
import axios from "axios";

const Register = () => {
  const [firstName, setfirstname] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setage] = useState("");
  const [country, setcountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegister] = useState(false);

  const addUserToBackend = () => {
    //console.log("in axios");

    axios
      .post("http://localhost:5000/users/", {
        firstName,
        lastName,
        age,
        country,
        email,
        password,
      })
      .then((result) => {
        setMessage(result.data.message);
        setIsRegister(true);
        //console.log(result);
      })
      .catch((err) => {
        //console.log(err);
        setIsRegister(false);
        setMessage(err.response.data.message);
      });
  };

  return (
    <div className="concontainerRegister">
      <div className="itemOfRegister">
        <input
          className="inputRegister"
          placeholder="First Name"
          type="text"
          onChange={(e) => {
            setfirstname(e.target.value);
          }}
        ></input>{" "}
        <br />
        <input
          className="inputRegister"
          placeholder="lastName "
          type="text"
          onChange={(e) => {
            setlastName(e.target.value);
          }}
        ></input>{" "}
        <br />
        <input
          className="inputRegister"
          placeholder="age "
          type="number"
          onChange={(e) => {
            setage(e.target.value);
          }}
        ></input>{" "}
        <br />
        <input
          className="inputRegister"
          placeholder="country "
          type="text"
          onChange={(e) => {
            setcountry(e.target.value);
          }}
        ></input>{" "}
        <br />
        <input
          className="inputRegister"
          placeholder="email "
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>{" "}
        <br />
        <input
          className="inputRegister"
          placeholder="password"
          type="password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        ></input>{" "}
        <br />
        <button onClick={addUserToBackend}>Register</button> <br />
        <p className={isRegistered ? "successful" : "error"}>{message}</p>
      </div>
    </div>
  );
};

export default Register;
