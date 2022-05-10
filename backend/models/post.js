const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: { type: String, required: true },
  image: { type: String },
  like: { type: Number},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Post", postSchema);
