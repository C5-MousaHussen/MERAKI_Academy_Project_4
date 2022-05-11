const express = require("express");
const { findOneAndUpdate, findByIdAndUpdate } = require("../models/post");

const postModel = require("../models/post");

// this function get post by author to show in profile of user...

const getPostByAuthor = (req, res) => {
  let authorName = req.params.id;

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

// this function for delete post from the author

const deletePostByauthor = (req, res) => {
  const author = req.token.userId;
  const _id = req.body._id;

  postModel
    .findByIdAndDelete({ _id })
    .then((result) => {
      if (!result.deletedCount) {
        return res.status(404).json({
          success: false,
          message: `The Author not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Deleted articles for the author: ${author}`,
        result,
        author,
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

// this function is for update the post for user
const updatePostByAuthor = (req, res) => {
  const _id = req.body._id;
  const description = req.body.description

  postModel
    .findByIdAndUpdate({ _id }, {description:description})
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Post: ${_id} is not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `Post updated`,
        article: result,
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

module.exports = { getPostByAuthor, deletePostByauthor ,updatePostByAuthor};
