import React, { useState, useContext } from "react";
import "./style.css";
import axios from "axios";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Register = () => {
  //nivegate
  const navigate = useNavigate();

  // provider context
  const { image, setImage, url, setUrl } = useContext(UserContext);

  //state

  const [firstName, setfirstname] = useState("");
  const [lastName, setlastName] = useState("");
  //const [image, setImage] = useState("");
  const [age, setage] = useState("");
  const [country, setcountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegister] = useState(false);
  const [profilePic, setProfilePic] = useState("");


  //function to add user
  const addUserToBackend = () => {

    axios
      .post("http://localhost:5000/users/", {
        firstName,
        lastName,
        age,
        country,
        email,
        password,
        image,
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
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", profilePic);
    data.append("upload_preset", "srcmongo");
    data.append("cloud_name", "mousa");

    fetch("  https://api.cloudinary.com/v1_1/mousa/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        setUrl(data.url);
        setImage(data.url);
      })
      .catch((err) => console.log(err));
  };

  

  //function to nivegate to ligin
  const loginPage = () => {
    navigate("/login");
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
        <input
          className="inputRegister"
          type="file"
          onChange={(e) => {
            // console.log(e.target.files[0]);
            setProfilePic(e.target.files[0]);
          }}
        ></input>{" "}
        <button onClick={uploadImage}>Upload</button>
        <br />
        <button onClick={addUserToBackend}>Register</button> <br />
        <div className={isRegistered ? "successful" : "error"}>
          <p>{message}</p>
          <button onClick={loginPage}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
