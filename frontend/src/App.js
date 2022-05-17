import "./App.css";

import React, { useState, createContext } from "react";
// import { Routes, Route } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
// import all function to active here
import Register from "./components/Register";
import { Login } from "./components/Login";
import { AddPost } from "./components/Addpost";
import { Home } from "./components/Home";
import { ProfileOfUser } from "./components/Profile";
import { EditProfile } from "./components/EditProfile";

export const UserContext = createContext();

function App() {
  const [token, setToken] = useState("");
  const [isLogin, setisLogin] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [userId, setUserId] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  // console.log(userId);

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          token,
          setToken,
          isLogin,
          setisLogin,
          userId,
          setUserId,
          firstName,
          setfirstName,
          lastName,
          setlastName,
          isSearch,
          setIsSearch,
          image,
          setImage,
          url,
          setUrl,
        }}
      >
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<AddPost />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<ProfileOfUser />} />
          <Route path="/profile/edit" element={<EditProfile />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
