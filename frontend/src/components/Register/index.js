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
        <div className="headerRegister"> <svg className="firtsitemSvgRigister" viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg></div> <br/>
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
        <div>
        <input 
          className="inputRegister"
          type="file"
          onChange={(e) => {
            // console.log(e.target.files[0]);
            setProfilePic(e.target.files[0]);
          }}
        ></input>{" "}
        <button className="bb" onClick={uploadImage}><svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                    <path d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                  </svg>{" "}</button>
        </div>
        
        <button className=" buttonJoin2 register" onClick={addUserToBackend}>Register</button> 
        <div className={isRegistered ? "successful" : "error"}>
          <p>{message}</p><br/>
          <button className=" buttonJoin3 in" onClick={loginPage}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
