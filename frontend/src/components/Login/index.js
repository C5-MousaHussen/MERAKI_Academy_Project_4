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
    <div className="concontainerRegister">
      <div className="itemOfRegister">
      <div className="headerRegister"> <svg className="firtsitemSvgRigister" viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg></div> <br/>
          <div className="someEdit"><h3>Log in to Twitter</h3></div>
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
        <button className="inputLogin in" onClick={signInUser}>Log In</button> <br />
        <p>{message}</p>
        <br/> <div className="smallestDiv">
          <p className="afterThat">Don't have an account? <button className="afterThat tik in" onClick={()=>{
            navigate("/register");
          }} >Register</button> </p>
        </div>
      </div>
    </div>
  );
};
