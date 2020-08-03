// Author - Padmesh Donthu
const Question = require("../models/question");
const mongoose = require("mongoose");
const UserAnswers = require("../models/userAnswers");
const History = require("../models/tests");

// Method to save the user answers to the mongo database
module.exports.saveUserAnswers = (req, res, next) => {
  var userAnswers = new UserAnswers();
  var id = new mongoose.Types.ObjectId();
  userAnswers._id = id;
  userAnswers.userId = req.body.userId;
  userAnswers.testType = req.body.testType;
  userAnswers.questionAnswers = req.body.questionAnswers;
  userAnswers
    .save()
    .then((result) => {
      res.status(201).json(id);
    })
    .catch((err) => {
      res.status(201).json(-1);
    });
};

// Method to add quiz score of the user
module.exports.addQuizScore = (req, res, next) => {
  var history = new History();
  var data = {
    score: req.body.quiz,
    createdDate: new Date(),
    quizTestId: req.body.quizTestId,
  };
  History.find({ userEmailID: req.body.userEmailID }, (err, document) => {
    if (!err && document.length == 1) {
      if (document[0].quizTests == null) {
        document[0].quizTests = [];
      }
      document[0].quizTests.push(data);
      document[0].save((err, result) => {
        if (!err) res.send(result);
        else {
          return next(err);
        }
      });
    } else {
      history.userEmailID = req.body.userEmailID;
      history.quizTests = [];
      history.quizTests.push(data);
      history.save((err, result) => {
        if (!err) res.send(result);
        else {
          return next(err);
        }
      });
    }
  });
};

// Method to get list of questions for quiz
module.exports.getQuizQuestions = (req, res, next) => {
  Question.aggregate([{ $sample: { size: parseInt(req.params.count, 10) } }])
    .exec()
    .then((questionList) => {
      res.status(200).json(questionList);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// Method to get list of verbal or quantitative questions for practice tests
module.exports.getVerbalAndQuantQuestions = (req, res, next) => {
  Question.aggregate([
    { $match: { subType: req.query.questionType } },
    { $sample: { size: parseInt(req.query.questionCount, 10) } },
  ])
    .exec()
    .then((questionList) => {
      res.status(200).json(questionList);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// Method to add verbal practice score of the user to the database
module.exports.addVerbalPracticeScore = (req, res, next) => {
  var history = new History();
  var data = {
    score: req.body.score,
    createdDate: new Date(),
    verbalTestId: req.body.verbalTestId,
  };
  History.find({ userEmailID: req.body.userEmailID }, (err, document) => {
    if (!err && document.length == 1) {
      if (document[0].verbalTests == null) {
        document[0].verbalTests = [];
      }
      document[0].verbalTests.push(data);
      document[0].save((err, result) => {
        if (!err) res.send(result);
        else {
          return next(err);
        }
      });
    } else {
      history.userEmailID = req.body.userEmailID;
      history.verbalTests = [];
      history.verbalTests.push(data);
      history.save((err, result) => {
        if (!err) res.send(result);
        else {
          return next(err);
        }
      });
    }
  });
};

// Method to add quantitative practice score of the user to the database
module.exports.addQuantPracticeScore = (req, res, next) => {
  var history = new History();
  var data = {
    score: req.body.score,
    createdDate: new Date(),
    quantTestId: req.body.quantTestId,
  };
  History.find({ userEmailID: req.body.userEmailID }, (err, document) => {
    if (!err && document.length == 1) {
      if (document[0].quantTests == null) {
        document[0].quantTests = [];
      }
      document[0].quantTests.push(data);
      document[0].save((err, result) => {
        if (!err) res.send(result);
        else {
          return next(err);
        }
      });
    } else {
      history.userEmailID = req.body.userEmailID;
      history.quantTests = [];
      history.quantTests.push(data);
      history.save((err, result) => {
        if (!err) res.send(result);
        else {
          return next(err);
        }
      });
    }
  });
};

// Method to get the attempt history of the user for the various tests taken by the user
module.exports.getAttemptHistory = (req, res, next) => {
  History.findOne({ userEmailID: req.query.userEmailID }, function (
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

// Method to get the list of questions and answers for a test
module.exports.getUserAnswer = (req, res, next) => {
  UserAnswers.findOne({ _id: req.query.id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
