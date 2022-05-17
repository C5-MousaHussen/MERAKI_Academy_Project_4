const express = require("express");
const post = require("../models/post");
const { findOneAndUpdate, findByIdAndUpdate } = require("../models/post");

const postModel = require("../models/post");

// this function get post by author to show in profile of user...

const getPostByAuthor = (req, res) => {
  let authorName = req.params.id;

  postModel
    .find({ author: authorName })
    .populate("author")
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

const deletePostById = (req, res) => {
  const author = req.token.userId;
  const _id = req.params.id;
  console.log({ _id });
  postModel
    .findByIdAndDelete({ _id })
    .then((result) => {
      console.log(result);
      if (result === null) {
        return res.status(404).json({
          success: false,
          message: `The post not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Deleted post ${_id}`,
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
const updatePostById = (req, res) => {
  const _id = req.body._id;
  const description = req.body.description;
  const image = req.body.image;

  postModel
    .findByIdAndUpdate({ _id }, { description: description, image: image })
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

module.exports = { getPostByAuthor, deletePostById, updatePostById };
