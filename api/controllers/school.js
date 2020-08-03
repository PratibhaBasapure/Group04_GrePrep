const mongoose = require("mongoose");
const UserSchools = require("../models/userSchools");

// Method to save the user answers to the mongo database
module.exports.saveUserSchools = (req, res, next) => {
    console.log(req.body);
  var userSchools = new UserSchools();
  console.log(req.body);
  userSchools._id = new mongoose.Types.ObjectId();
  userSchools.userId = req.body.userId;
  console.log(userSchools);
  userSchools.favouriteSchools = req.body.favouriteSchools;
  console.log(userSchools);
  userSchools
    .save()
    .then((result) => {
      res.send(true);
    })
    .catch((err) => {
      res.send(false);
    });
};
