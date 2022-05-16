import React, { useState, useContext } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export const Login = () => {
  const {
    token,
    setToken,
    isLogin,
    setisLogin,
    userId,
    setUserId,
    firstName,
    setfirstName,
    lastName,
    setlastName,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const signInUser = () => {
    axios
      .post("http://localhost:5000/login/", { email, password })
      .then((result) => {
        setToken(result.data.token);
        const token = result.data.token;
        setisLogin(true);
       // console.log(result);
        setUserId(result.data._id);
        const userId = result.data._id;
        setfirstName(result.data.firstName);
        const firstName = result.data.firstName;
        const lastName = result.data.lastName;
        setlastName(result.data.lastName);
        

        setisLogin(true);
        const isLogin = true;
        navigate("/home");
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        // console.log("login Success");
      })
      .catch((error) => {
        // console.log("Nooo this user is not Registering");
        setMessage(error.response.data.message);
      });
  };

  return (
    <div className="concontainerLogin">
      <div className="itemOfLogin">
        <input
          className="inputLogin"
          placeholder="Email"
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>{" "}
        <br />
        <input
          className="inputLogin"
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>{" "}
        <br />
        <button onClick={signInUser}>Log In</button> <br />
        <p>{message}</p>
      </div>
    </div>
  );
};
