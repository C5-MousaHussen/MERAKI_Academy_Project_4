const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  like: [
    {
      like: { type: String },
      mediaType: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    },
  ],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Library", librarySchema);
