import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";

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

  return (
    <div className="contanirHome">
      <div className="navbarHome">
        <p>Helloo</p>
        <h1> صفحة تويتر التجريبية</h1>
      </div>
      <div className="postDiv">
      <div className="createPost">
        <h1>create post</h1>
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
      <div className="itemHome"></div>
    </div>
  );
};
