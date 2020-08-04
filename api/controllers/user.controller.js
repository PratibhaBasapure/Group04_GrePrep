//  Author: Pratibha B(B00847415)
const mongoose = require("mongoose");
const passport = require("passport");
const User = mongoose.model("User");
const _ = require("lodash");
const { use } = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = (req, res, next) => {
  var user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.mobileNumber = req.body.mobileNumber;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      if (err.code == 11000)
        res.status(422).send(["Duplicate email adrress found."]);
      else return next(err);
    }
  });
};

module.exports.authenticate = (req, res, next) => {
  // call for passport authentication
  passport.authenticate("local", (err, user, info) => {
    // error from passport middleware
    if (err) return res.status(400).json(err);
    // registered user
    else if (user)
      return res.status(200).json({
        token: user.generateJwt(),
        email: user.email,
      });
    // unknown user or wrong password
    else return res.status(404).json(info);
  })(req, res);
};

module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    else
      return res
        .status(200)
        .json({
          status: true,
          user: _.pick(user, [
            "firstName",
            "lastName",
            "mobileNumber",
            "email",
          ]),
        });
  });
};

module.exports.updateUserDetails = async (req, res, next) => {
  const updates = Object.keys(req.body);
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          firstName: req.body.firstName,
          mobileNumber: req.body.mobileNumber,
        },
      },
      { new: true },
      function (err, user) {
        res.send(user);
      }
    );

    if (!user) {
      return res
        .status(404)
        .send({ message: "You do not seem to be registered" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.updateUserPassword = async (req, res, next) => {
  const updates = Object.keys(req.body);
  let user = await User.findOne({ email: req.body.email });
  let encryptedPassword;
  try {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        req.body.password = hash;
        User.findOneAndUpdate(
          { email: req.body.email },
          { password: req.body.password },
          { new: true },
          function (err, response) {
            // Handle any possible database errors
            if (err) {
              res.json({
                message: "Database Update Failure",
              });
            }
            res.send(response);
          }
        );
      });
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const updates = Object.keys(req.body);
  try {
    const user = await User.findOneAndDelete(
      { email: req.body.email },
      function (err, user) {
        if (err) {
          return res
            .status(404)
            .send({ message: "You do not seem to be registered" });
        } else {
          res.send(user);
        }
      }
    );
  } catch (error) {
    res.status(400).send(error);
  }
};
