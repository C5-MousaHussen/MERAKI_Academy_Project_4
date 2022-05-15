import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";

// to export Navbar
import { Navbar } from "../Navbar";
import { SearchBar } from "../Search";

//



export const Home = () => {
  const [articles, setArticels] = useState([]);
  const [comments, setComment] = useState();

  const token = localStorage.getItem("token");

  const getAllArtilces = () => {
    axios
      .get("http://localhost:5000/post", {
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
    getAllArtilces();
  }, []);

  const addComment = (articleId) => {
    axios
      .post(
        `http://localhost:5000/post/${articleId}/comments/`,
        { comments },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        //console.log(result);
        getAllArtilces();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        getAllArtilces();
        //setMessage(result.data.message);
      })
      .catch((error) => {
        setMessage("Sign in firs to add and get Tweet");
      });
  };

  

  return (
    <div className="contanirHome">
      <div className="navbarHome">
        {/*  <div className="homeSvg">
        <h1 role="heading">
          <a
            aria-label="Twitter"
            role="link"
            href="/home"
            className="homeButton"
          >
            <div dir="auto">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="SVG">
                <g>
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                </g>
              </svg>
              <span class="r-qvutc0"></span>
            </div>
          </a>
        </h1>
        </div> */}
        <h1> صفحة تويتر التجريبية</h1>
        <div className="Navbar"><Navbar /></div>
      </div>
      <div className="postDiv">
        <div className="createPost">
          <h1>Home</h1>
          <div className="areaText">
            <textarea className="postBox"
              placeholder="What's happening?"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>{" "}
            <br />
            <button className="buttonOfTweet" onClick={newPost}> Tweet</button> <br />
            <p>{message}</p>
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
                  <br />
                  <p>{element.like}</p>

                  <br />
                  {element.comments &&
                    element.comments.map((ele) => {
                      // console.log(ele);
                      return <p>{ele.comments}</p>;
                    })}
                  <textarea
                    placeholder="comment"
                    type="text"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>
                  <button onClick={() => addComment(element._id)}>
                    Add Comment
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      <div className="itemHome">
        <h1>item here</h1>
     <div><SearchBar /></div>

        </div>
    </div>
  );
};
