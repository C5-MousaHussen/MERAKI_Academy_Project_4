const express = require("express");

const {
  getPostByAuthor,
  deletePostById,
  updatePostById,
} = require("../controllers/profile");

//The middelwere
const authentication = require("../middleware/authentication");

//define a router
const profileRouter = express.Router();

profileRouter.get("/:id", getPostByAuthor);
profileRouter.delete("/:id", authentication, deletePostById);
profileRouter.put("/:id", updatePostById);

module.exports = profileRouter;
