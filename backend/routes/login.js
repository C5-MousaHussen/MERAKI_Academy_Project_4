const express = require("express");
const {login} = require("../controllers/login")

//define a router
const loginRouter = express.Router();

loginRouter.post("/", login);
// the testing is  POST: 
//http://localhost:5000/login/

module.exports = loginRouter;
