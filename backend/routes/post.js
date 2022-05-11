const express = require("express");

const {
  createPost,
  getAllPosts,
} = require("../controllers/post");

//The middelwere
const authentication = require("../middleware/authentication");


// create a router for post
const postRouter = express.Router();

//the ffect router..
postRouter.post("/", authentication, createPost);
postRouter.get("/", authentication, getAllPosts);


module.exports = postRouter;
