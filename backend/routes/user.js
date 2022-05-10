const express = require("express");

const { register } = require("../controllers/user");

// define a router
const userRouter = express.Router();

userRouter.post("/", register);

module.exports = userRouter;
