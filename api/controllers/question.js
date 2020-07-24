const Question = require("../models/question");
const mongoose = require("mongoose");
const UserAnswers = require("../models/userAnswers");

module.exports.saveUserAnswers = (req, res, next) => {
  console.log("Inside saveUserAnswers Controller");
  var userAnswers = new UserAnswers();
  userAnswers._id = new mongoose.Types.ObjectId();
  userAnswers.userId = req.body.userId;
  userAnswers.testType = req.body.testType;
  userAnswers.questionAnswers = req.body.questionAnswers;
  console.log(userAnswers);
  userAnswers
    .save()
    .then((result) => {
      console.log(result);
      res.send(true);
    })
    .catch((err) => {
      console.log(err);
      res.send(false);
    });
};
