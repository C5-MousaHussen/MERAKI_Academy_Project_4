const express = require("express");

const { createPost } = require("../controllers/post");

//The middelwere
const authentication = require("../middleware/authentication");

// create a router for post
const postRouter = express.Router();



//the ffect router..
postRouter.post("/", authentication, createPost);


module.exports = postRouter;
