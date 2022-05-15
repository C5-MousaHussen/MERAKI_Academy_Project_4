import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

//import navbar
import { Navbar } from "../Navbar";

// here is function for profile of User ...
/* 
1- i need go show element of the user */

export const ProfileOfUser = () => {
  const { isLogin, setisLogin, userId, setUserId } = useContext(UserContext);

  const [articles, setArticels] = useState([]);
  const [comments, setComment] = useState("");

  const token = localStorage.getItem("token");
  const userId1 = localStorage.getItem("userId");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  // console.log(userId1);

  const getPostByAuthor = () => {
    axios
      .get(`http://localhost:5000/profile/${userId1}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        // console.log(result);
        setArticels(result.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPostByAuthor();
  }, []);

  // here create post depertment

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
        getPostByAuthor();
        //setMessage(result.data.message);
      })
      .catch((error) => {
        setMessage("Sign in firs to add and get Tweet");
      });
  };

  return (
    <div className="contanerOfProile">
      <div className="navbarBox">
        <div className="navbar"><Navbar /></div>
      </div>
      <div className="profile">
        <div className="editProfile">
          <div className="styleUser">
            <button className="butonEdit">Edit profile</button>
            <h2 className="userName">
              {firstName.toUpperCase()} {lastName.toLocaleUpperCase()}
            </h2>
          </div>
          <div className="createPost">
            <div className="areaText">
              <textarea
                className="postBox"
                placeholder="What's happening?"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>{" "}
              <br />
              <button className="buttonOfTweet" onClick={newPost}>
                {" "}
                Tweet
              </button>{" "}
              <br />
              <p>{message}</p>
            </div>
          </div>
        </div>
        <div className="getPost">
          {articles &&
            articles.map((element) => {
              //console.log(element);
              return (
                <div>
                  <h4 id={element.id}>{element.author.firstName}</h4>
                  <br />
                  <p>{element.description}</p>
                  <p>{element.like} </p>
                  <div className="borderPost"></div>

                  <br />
                </div>
              );
            })}
        </div>
      </div>
      <div className="searchBar"></div>
    </div>
  );
};
