const commentModel = require("../models/comments");
const postModel = require("../models/post");

// this function to create comment

const createComment = (req, res) => {
  const postId = req.params.id;
  const { comments } = req.body;

  const newComment = new commentModel({
    comments,
    commenter: req.token.userId,
  });

  newComment
    .save()
    .then((result) => {
      postModel
        .updateOne({ _id: postId }, { $push: { comments: result._id } })
        .then(() => {
          res.status(201).json({
            success: true,
            message: `Comment added`,
            comment: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
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

module.exports = { createComment };
