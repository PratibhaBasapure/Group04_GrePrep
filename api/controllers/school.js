const mongoose = require("mongoose");
const UserSchools = require("../models/userSchools");

// Method to save the user answers to the mongo database
module.exports.saveUserSchools = (req, res, next) => {
  var userSchools = new UserSchools();
  userSchools._id = new mongoose.Types.ObjectId();
  userSchools.userId = req.body.userId;
  userSchools.favouriteSchools = req.body.favouriteSchools;
  userSchools
    .save()
    .then((result) => {
      res.send(true);
    })
    .catch((err) => {
      res.send(false);
    });
};
