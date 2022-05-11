const express = require("express");

const postModel = require("../models/post");

// this function get post by author to show in profile of user...

const getPostByAuthor = (req, res) => {
  let authorName = req.query.author;

  postModel
    .find({ author: authorName })
    .then((posts) => {
      if (!posts.length) {
        return res.status(404).json({
          success: false,
          message: `The author: ${authorName} has no Posts for this user yet`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the Posts for the author: ${authorName}`,
        posts: posts,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = { getPostByAuthor };
