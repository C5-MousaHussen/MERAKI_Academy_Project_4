const express = require("express");

const postModel = require("../models/post");

// function for create post

const createPost = (req, res) => {
  const { description, image, like } = req.body;

  const newPost = new postModel({
    author: req.token.userId,
    description,
    image,
    like,
  });

  newPost
    .save()
    .then((post) => {
      res.status(201).json({
        success: true,
        message: `Post created`,
        post: post,
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

// this function is to get all of posts..

const getAllPosts = (req, res) => {
  const userId = req.token.userId;

  postModel
    .find({})
    .populate("comments")
    .then((posts) => {
      if (posts.length) {
        res.status(200).json({
          success: true,
          message: `All the articles`,
          userId: userId,
          posts: posts,
          comments: posts.comments,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Posts Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

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
        message: `All the articles for the author: ${authorName}`,
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

module.exports = { createPost, getAllPosts, getPostByAuthor };