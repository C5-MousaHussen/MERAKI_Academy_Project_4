const express = require("express");

const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  userModel.findOne({ email }).then(async (result) => {
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `The email doesn't exist`,
      });
    }
    try {
      const valid = await bcrypt.compare(password, result.password);
      if (!valid) {
        return res.status(403).json({
          success: false,
          message: `The password you’ve entered is incorrect`,
        });
      }
      const payload = {
        userId: result._id,
        author: result.firstName,
      };
      const options = {
        expiresIn: "60m",
      };
      const token = await jwt.sign(payload, process.env.SECRET, options);
    //  console.log(result);
      res.status(200).json({
        success: true,
        message: `Valid login credentials`,
        token: token,
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  });
};

module.exports = { login };
