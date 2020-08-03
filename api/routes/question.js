// Author - Padmesh Donthu
const express = require("express");
const router = express.Router();
const Question = require("../models/question");
const questionController = require("../controllers/question");

// Get request to get the list of questions from mongo database
router.get("/", (req, res) => {
  Question.aggregate([{ $sample: { size: 50 } }])
    .exec()
    .then((questionList) => {
      res.status(200).json(questionList);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Post request to save the user answers to the database
router.post("/saveUserAnswers", questionController.saveUserAnswers);

// Post request to save the user quiz test score to the database
router.post("/addQuizHistory", questionController.addQuizScore);

// Get request to get list of questions for the quiz
router.get("/getQuizQuestions/:count", questionController.getQuizQuestions);

// Get request to get the list of verbal.quantitative questions for the tests
router.get(
  "/getVerbalAndQuantQuestions",
  questionController.getVerbalAndQuantQuestions
);

// Post request to add verbal practice score to the database
router.post(
  "/addVerbalPracticeHistory",
  questionController.addVerbalPracticeScore
);

// Post request to add quantitative practice score to the database
router.post(
  "/addQuantPracticeHistory",
  questionController.addQuantPracticeScore
);

// Get request to get the attempt histories of the user
router.get("/getAttemptHistory", questionController.getAttemptHistory);

// Get request to get the list of user answers for a test
router.get("/getAnswers", questionController.getUserAnswer);

module.exports = router;
