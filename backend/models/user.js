const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  image: { type: String },
  lastName: { type: String },
  age: { type: Number, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
