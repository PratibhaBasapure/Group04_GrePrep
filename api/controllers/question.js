const Question = require("../models/question");
const mongoose = require("mongoose");
const UserAnswers = require("../models/userAnswers");

// Method to save the user answers to the mongo database
module.exports.saveUserAnswers = (req, res, next) => {
  var userAnswers = new UserAnswers();
  userAnswers._id = new mongoose.Types.ObjectId();
  userAnswers.userId = req.body.userId;
  userAnswers.testType = req.body.testType;
  userAnswers.questionAnswers = req.body.questionAnswers;
  userAnswers
    .save()
    .then((result) => {
      res.send(true);
    })
    .catch((err) => {
      res.send(false);
    });
};
