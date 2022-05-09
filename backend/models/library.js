const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  likes: [
    {
      likeId: { type: String },
      mediaType: { type: String },
    },
  ],
  favourites: [
    {
      favId: { type: String },
      mediaType: { type: String },
    },
  ],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Library", librarySchema);
