const express = require("express");

const {getPostByAuthor ,deletePostByauthor} = require("../controllers/profile");

//define a router
const profileRouter = express.Router();

profileRouter.get("/:id", getPostByAuthor);
profileRouter.delete("/:id", deletePostByauthor);

module.exports = profileRouter;
