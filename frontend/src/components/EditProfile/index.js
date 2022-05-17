import React, { useState, useContext } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export const EditProfile = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");

  const userId = localStorage.getItem("userId");

  const editEvent = () => {
    axios
      .put(`http://localhost:5000/users/${userId}/edit`, {
        firstName,
        lastName,
        image,
      })
      .then((result) => {})
      .catch((err) => {});
  };

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "srcmongo");
    data.append("cloud_name", "mousa");

    fetch("  https://api.cloudinary.com/v1_1/mousa/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        setImage(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input
        placeholder="First Name"
        onChange={(e) => {
          setfirstName(e.target.value);
        }}
      ></input>{" "}
      <br />
      <input
        placeholder="Last Name"
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      ></input>{" "}
      <br />
      <input
        className="inputRegister"
        type="file"
        onChange={(e) => {
          // console.log(e.target.files[0]);
          setImage(e.target.files[0]);
        }}
      ></input>{" "}
      <button onClick={uploadImage}>Upload</button>
      <br /> <br />
      <button onClick={editEvent}>Edit</button>
    </div>
  );
};
