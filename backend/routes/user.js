const express = require("express");

const { register, updateProfile } = require("../controllers/user");


// define a router
const userRouter = express.Router();

userRouter.post("/", register);
userRouter.put("/:id/edit",updateProfile)

module.exports = userRouter;
