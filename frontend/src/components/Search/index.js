import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export const SearchBar = () => {
  const { isSearch, setIsSearch } =
    useContext(UserContext);

  const [articles, setArticels] = useState([]);
  const [comments, setComment] = useState();
  const [nameUser, setNameUser] = useState();
  const [post, setpost] = useState();
  const [result, setResult] = useState();

  const token = localStorage.getItem("token");

  const [findPost, setFindPost] = useState("");

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
        setArticels(result.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //effect
  useEffect(() => {
    getAllArtilces();
  }, []);

  const buttonSearch = () => {
    //console.log(result);
    result.map((element) => {
      if (
        element.author.firstName.includes(findPost) ||
        element.description.includes(findPost)
      ) {
        console.log(element);
        setIsSearch(true)
        return element.description;
      } else {
        //setIsSearch(false)
        console.log("not work");
      }

      return (
        <>
          <p>{element.description}</p>
        </>
      );
    });
  };
  
  return (
    <div>
      <label htmlFor="header-search">
        <span className="visually-hidden"></span>
      </label>
      <input
        type="text"
        id="header-search"
        placeholder="Search posts"
        onChange={(e) => {
          setFindPost(e.target.value);
        }}
      />
      <button onClick={buttonSearch}>Search</button>
    </div>
  );
};
