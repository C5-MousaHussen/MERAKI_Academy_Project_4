import React, { useState, useContext } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../App";

export const Navbar = () => {
  const { token, setToken, isLogin, setisLogin } = useContext(UserContext);

  return (
    <div>
      <div className="link">
        <Link to="/home">Home</Link>  <br />
        <Link to="/home">Hashtag</Link> <br />
        <Link to="/home">Message</Link> <br />
        <Link to="/profile">profile</Link> <br />
        <Link to="/login">Log Out</Link> <br />
        <br /> 
      </div>
      {/*  <div style={{ display: isLogin ? "block" : "none", gap: "16px" }}>
            <Link to="/dashboard"> Dashboard </Link>
            <Link to="/addnewarticle"> Add a new Article </Link>
            <Link to="/login" onClick={Logout}>
              {" "}
              LogOut{" "}
            </Link>
          </div> */}
    </div>
  );
};
