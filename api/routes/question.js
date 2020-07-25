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

module.exports = router;
