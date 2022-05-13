import "./App.css";

import React, { useState, createContext } from "react";
// import { Routes, Route } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
// import all function to active here
import Register from "./components/Register";
import { Login } from "./components/Login";
import { AddPost } from "./components/Addpost";
import { Home } from "./components/Home";

export const UserContext = createContext();

function App() {
  const [token, setToken] = useState("");
  const [isLogin, setisLogin] = useState(false);

  return (
    <div className="App">
      
      <UserContext.Provider value={{ token, setToken, isLogin, setisLogin }}> 
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<AddPost />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      </UserContext.Provider> 
    </div>
  );
}

export default App;
