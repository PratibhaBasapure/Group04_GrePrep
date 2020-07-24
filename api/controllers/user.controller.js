const mongoose = require("mongoose");
const passport = require("passport");
const User = mongoose.model("User");
const _ = require("lodash");
const { use } = require("passport");

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

module.exports.updateFirstName = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const user = await UserModel.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      function (err, user) {
        res.send(user);
      }
    );
    if (!user) {
      return res
        .status(404)
        .send({ message: "You do not seem to be registered" });
    }
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};
