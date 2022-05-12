const express = require("express");

const { createPost, getAllPosts } = require("../controllers/post");

const { createComment } = require("../controllers/comment");

//The middelwere
const authentication = require("../middleware/authentication");

// create a router for post
const postRouter = express.Router();

//the ffect router..
postRouter.post("/", authentication, createPost);
postRouter.get("/", authentication, getAllPosts);

postRouter.post("/:id/comments", authentication, createComment);

module.exports = postRouter;
