const express = require("express");

const {
  getPostByAuthor,
  deletePostByauthor,
  updatePostByAuthor,
} = require("../controllers/profile");

//The middelwere
const authentication = require("../middleware/authentication");

//define a router
const profileRouter = express.Router();

profileRouter.get("/:id", getPostByAuthor);
profileRouter.delete("/:id", authentication, deletePostByauthor);
profileRouter.put("/:id", updatePostByAuthor);

module.exports = profileRouter;
