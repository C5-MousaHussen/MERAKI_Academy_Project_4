const res = require("express/lib/response");
const userModel = require("../models/user");

// make a function for register user to the site

const register = (req, res) => {
  const { firstName, lastName, age, country, email, password, image } =
    req.body;

  const user = new userModel({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    image,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        author: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

//function to update user profile
const updateProfile = (req, res) => {
  const authorName = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const image = req.body.image;

  userModel
    .findByIdAndUpdate(
      {
        _id: authorName,
      },
      {
        firstName:firstName,
        lastName:lastName,
        image:image,
        
      }
    )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Post: ${authorName} is not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `user updated`,
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

module.exports = { register, updateProfile };
