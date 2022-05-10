const res = require("express/lib/response");
const userModel = require("../models/user");

// make a function for register user to the site

const register = (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;

  const user = new userModel({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
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
    .catch((error) => {
      if (error.keyPattern) {
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

module.exports = { register };
