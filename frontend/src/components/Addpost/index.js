import React, { useState, useContext } from "react";
import "./style.css";
import axios from "axios";
import { UserContext } from "../../App";

export const AddPost = () => {
  const { token, setToken, isLogin, setisLogin } = useContext(UserContext);

  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [like, setLike] = useState("");
  const [message, setMessage] = useState("");

  const tokenInStorage = localStorage.getItem("token");

  const newPost = () => {
    axios
      .post(
        "http://localhost:5000/post/",
        { description, image, like },
        { headers: { Authorization: `Bearer ${tokenInStorage}` } }
      )
      .then((result) => {
        setMessage(result.data.message);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  return (
    <div>
      <textarea
        placeholder="Description"
        rows="4"
        cols="50"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></textarea>{" "}
      <br />
      <button onClick={newPost}> Create New Post </button> <br />
      <p>{message}</p>
    </div>
  );
};
