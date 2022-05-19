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
  //nivegate
  const navigate = useNavigate();

  const { image, setImage } = useContext(UserContext);

  const [articles, setArticels] = useState([]);
  const [comments, setComment] = useState("");
  const [postImage, setPostImage] = useState("");
  const [firstName, setFirsName] = useState("");
  const [lastName, setLastName] = useState("");

  const token = localStorage.getItem("token");
  const userId1 = localStorage.getItem("userId");
  // const firstName = localStorage.getItem("firstName");
  // const lastName = localStorage.getItem("lastName");

  // console.log(userId1);

  const getPostByAuthor = () => {
    axios
      .get(`http://localhost:5000/profile/${userId1}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        //console.log(result.data.posts[0].author.image);
        setArticels(result.data.posts.reverse());
        setImage(result.data.posts[0].author.image);
        setFirsName(result.data.posts[0].author.firstName);
        setLastName(result.data.posts[0].author.lastName);
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
  //const [image, setImage] = useState("");
  const [like, setLike] = useState("");
  const [message, setMessage] = useState("");

  const tokenInStorage = localStorage.getItem("token");

  const newPost = () => {
    axios
      .post(
        "http://localhost:5000/post/",
        { description, postImage, like },
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

  // function to upload image for post
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", postImage);
    data.append("upload_preset", "srcmongo");
    data.append("cloud_name", "mousa");

    fetch("  https://api.cloudinary.com/v1_1/mousa/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        setPostImage(data.url);
      })
      .catch((err) => console.log(err));
  };

  //function to delet post

  const deletePost = (postId) => {
    axios
      .delete(`http://localhost:5000/profile/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        getPostByAuthor();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // function for edit the post

  const editPost = (postId) => {
    axios.put(`http://localhost:5000/profile/${postId}`, {
      description,
      image,
    });
  };

  return (
    <div className="contanirHome">
      <div className="navbarHome">
        <div className="navbar">
          <div className="homeSvg">
            <h1 role="heading">
              <a
                aria-label="Twitter"
                role="link"
                href="/home"
                className="homeButton"
              >
                <div>
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="Svg1">
                    <g>
                      <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                    </g>
                  </svg>
                  <span class="r-qvutc0"></span>
                </div>
              </a>
            </h1>
          </div> <br/>
          <div className="Navbar">
            <Navbar />
          </div>
        </div>
      </div>
      <div className="profile">
        <div className="editProfile">
          <div className="styleUser">
            <div className="first">
              <p className="userName">
                <div className="profilePicture">
                  <img className="profilePicture" src={image} />{" "}
                </div>
                <div className="name">
                  {firstName.toUpperCase()} {lastName.toUpperCase()}
                </div>
              </p>
            </div>
            <div className="createPostProfile">
              <div className="areaTextprofile">
                <textarea
                  className="postBox insideprofile"
                  placeholder="What's happening?"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>{" "}
                <br />
                <input
                  className="inputRegister"
                  type="file"
                  onChange={(e) => {
                    // console.log(e.target.files[0]);
                    setPostImage(e.target.files[0]);
                  }}
                ></input>{" "}
                <button className="bb" onClick={uploadImage}>
                  {" "}
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                    <path d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                  </svg>{" "}
                </button>
                <button className="buttonOfTweet" onClick={newPost}>
                  {" "}
                  Tweet
                </button>{" "}
                <br />
                <p>{message}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="getPost">
          {articles &&
            articles.map((element) => {
              // console.log(element);
              return (
                <div className="statusDiv">
                  <h4 id={element.id}>{element.author.firstName}</h4>
                  <br />
                  <p>{element.description}</p>
                  <p
                    className="pImagePost"
                    style={{
                      display: element.postImage !== "" ? "block" : "none",
                    }}
                  >
                    <img className="imagePost" src={element.postImage} />{" "}
                  </p>
                  <div className="buttonEditAndDelete">
                    <button
                      className="editButton"
                      onClick={() => {
                        deletePost(element._id);
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                      </svg>
                    </button>
                    <button
                      className="editButton"
                      onClick={() => {
                        editPost(element._id);
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 16 16">
                        <path d="M12.496 8a4.491 4.491 0 0 1-1.703 3.526L9.497 8.5l2.959-1.11c.027.2.04.403.04.61Z" />
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1 0a7 7 0 1 0-13.202 3.249l1.988-1.657a4.5 4.5 0 0 1 7.537-4.623L7.497 6.5l1 2.5 1.333 3.11c-.56.251-1.18.39-1.833.39a4.49 4.49 0 0 1-1.592-.29L4.747 14.2A7 7 0 0 0 15 8Zm-8.295.139a.25.25 0 0 0-.288-.376l-1.5.5.159.474.808-.27-.595.894a.25.25 0 0 0 .287.376l.808-.27-.595.894a.25.25 0 0 0 .287.376l1.5-.5-.159-.474-.808.27.596-.894a.25.25 0 0 0-.288-.376l-.808.27.596-.894Z" />
                      </svg>
                    </button>
                  </div>

                  <br />
                </div>
              );
            })}
        </div>
      </div>
      <div className="itemHome">
        <div>
          <button
            onClick={() => {
              navigate("/profile/edit");
            }}
            className="butonEdit"
          >
            Edit profile
          </button>
        </div>
      </div>
    </div>
  );
};
