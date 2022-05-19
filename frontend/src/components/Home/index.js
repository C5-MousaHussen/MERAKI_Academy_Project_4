import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { UserContext } from "../../App";

// to export Navbar
import { Navbar } from "../Navbar";
//import { SearchBar } from "../Search";

//

export const Home = () => {
  const { isSearch, setIsSearch } = useContext(UserContext);

  const [postImage, setPostImage] = useState("");
  const [articles, setArticels] = useState([]);
  const [comments, setComment] = useState();
  const [result, setResult] = useState();
  const [findPost, setFindPost] = useState("");
  let newarr = [];
  const [filterSearch, setFilterSearch] = useState([]);
  const [idPost, setIdPost] = useState(false);

  const token = localStorage.getItem("token");

  //function to get all posts
  const getAllArtilces = () => {
    axios
      .get("http://localhost:5000/post", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        const filterSearch = result.data.posts.filter((element) => {
          return (
            element.author.firstName.includes(findPost) ||
            element.description.includes(findPost)
          );
        });
        setResult(filterSearch);
        setArticels(result.data.posts.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllArtilces();
  }, []);

  // here for button of search
  const buttonSearch = () => {
    result.filter((element) => {
      if (
        element.author.firstName.includes(findPost) ||
        element.description.includes(findPost)
      ) {
        newarr.push(element);
      }
      setArticels(newarr);
    });
  };

  // console.log(articles);

  //function to add a comments
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

  //to creat new post
  const newPost = () => {
    axios
      .post(
        "http://localhost:5000/post/",
        { description, postImage, like },
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

  return (
    <div className="contanirHome">
      <div className="navbarHome">
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
        </div>{" "}
        <br />
        <div className="Navbar">
          <Navbar />
        </div>
      </div>
      <div className="postDiv">
        <div className="createPost">
          <h2>Home</h2>

          <div className="areaText">
            <div>
              <textarea
                className="postBox"
                placeholder="What's happening?"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>{" "}
            </div>

            <br />
            <div className="marshmello">
              <div className="upPic">
                <input
                  className="inputPhoto"
                  type="file"
                  onChange={(e) => {
                    // console.log(e.target.files[0]);
                    setPostImage(e.target.files[0]);
                  }}
                ></input>{" "}
                <button className="bb" onClick={uploadImage}>
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
              </div>
              <div className="TweetPress">
                <button className="buttonOfTweet" onClick={newPost}>
                  {" "}
                  Tweet
                </button>{" "}
              </div>
              <br />
            </div>
            {/* <p>{message}</p> */}
          </div>
        </div>
        <div className="getPost">
          {articles &&
            articles.map((element) => {
              //console.log(element);
              return (
                <div className="statusDiv">
                  <div className="barPost">
                    <img className="profilePic" src={element.author.image} />
                    <h4 id={element.id}>{element.author.firstName}</h4>
                  </div>

                  <br />
                  <p>{element.description}</p>
                  <br />
                  <p
                    className="paragraphImage"
                    style={{
                      display: element.postImage !== "" ? "block" : "none",
                    }}
                  >
                    <img className="imagePost" src={element.postImage} />
                  </p>
                  <br />
                  <div className="reaction">
                    <button
                      onClick={() => {
                        setIdPost(element._id);
                      }}
                      className="itemReaction"
                    >
                      <svg className="svgReaction" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                      </svg>
                      <p className="pReaction">{element.comments.length}</p>
                    </button>
                    <button className="itemReaction">
                      <svg
                        className="svgReaction"
                        width="15"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                      </svg>
                      <p className="pReaction"> 1</p>
                    </button>
                    <button className="itemReaction">
                      <svg className="svgReaction" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                      </svg>
                    </button>
                  </div>

                  <br />

                  <div
                    className="roomComment"
                    style={{
                      display: idPost === element._id ? "block" : "none",
                    }}
                  >
                    <div className="insideRoom">
                      <div className="headerRoomComment">
                        <button
                          onClick={() => {
                            setIdPost("");
                          }}
                          className="editButton"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"></path>
                          </svg>
                        </button>
                      </div>

                      <div className="footerRoomComment">
                        <div className="theComments">
                          {element.comments &&
                            element.comments.map((ele) => {
                              console.log(ele.commenter.image);
                              return (
                                <div className="contanerOfComment">
                                  <div className="hedearCommenter">
                                    <img
                                      className="commentPicture"
                                      src={ele.commenter.image}
                                    />
                                    <p className="commenterName">
                                      {ele.commenter.firstName}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="effectComment">
                                      <p className="zz">{ele.comments}</p>
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                        <div className="ReactionCommint">
                          <textarea
                            className="boxComment"
                            placeholder="comment"
                            type="text"
                            onChange={(e) => {
                              setComment(e.target.value);
                            }}
                          ></textarea>
                          <button
                            className="buttonOfComment"
                            onClick={() => addComment(element._id)}
                          >
                            Replay
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="itemHome">
        <div>
          <input
            type="text"
            className="searchBar"
            placeholder="Search..."
            onChange={(e) => {
              setFindPost(e.target.value);
            }}
          />
          <button
            className="buttonSearch"
            onClick={() => {
              // setArticels("");
              buttonSearch();
            }}
          >
            <svg width="25" height="25" viewBox="0 0 16 16">
              <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
              <path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" />
            </svg>
          </button>
        </div>
        <div className="showImagePost">
          <div>
            <h3 className="hedarOfTrend">Trends for you</h3>
          </div>
          <div className="sortImage">
            {articles &&
              articles.map((element) => {
                //console.log(element.postImage);

                if (element.postImage === "") {
                  return <div></div>;
                }

                return (
                  <div>
                    <img className="ImagePost" src={element.postImage} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
