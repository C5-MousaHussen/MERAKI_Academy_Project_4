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
        setArticels(result.data.posts);
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
    <div className="contanerOfProile">
      <div className="navbarBox">
        <div className="navbar">
          <Navbar />
        </div>
      </div>
      <div className="profile">
        <div className="editProfile">
          <div className="styleUser">
            <div className="first">
              <h2 className="userName">
                <div className="profilePicture">
                  <img className="profilePicture" src={image} />{" "}
                </div>
                <div className="name">
                  {firstName.toUpperCase()} {lastName.toUpperCase()}
                </div>
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
                <input
                  className="inputRegister"
                  type="file"
                  onChange={(e) => {
                    // console.log(e.target.files[0]);
                    setPostImage(e.target.files[0]);
                  }}
                ></input>{" "}
                <button onClick={uploadImage}>Upload</button>
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
                <div>
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
                  <div>
                    <button
                      onClick={() => {
                        deletePost(element._id);
                      }}
                    >
                      Delet Post
                    </button>
                    <button
                      onClick={() => {
                        editPost(element._id);
                      }}
                    >
                      Edit Post
                    </button>
                  </div>
                  <div className="borderPost"></div>

                  <br />
                </div>
              );
            })}
        </div>
      </div>
      <div className="searchBar">
        <div>
          <button className="butonEdit">Edit profile</button>
        </div>
      </div>
    </div>
  );
};
