const express = require("express");

const {getPostByAuthor} = require("../controllers/profile");

//define a router
const profileRouter = express.Router();

profileRouter.get("/:id", getPostByAuthor);

module.exports = profileRouter;
