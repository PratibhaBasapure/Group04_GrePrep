const express = require("express");
const router = express.Router();
const Question = require("../models/question");
const questionController = require("../controllers/question");

router.get("/", (req, res) => {
  Question.aggregate([{ $sample: { size: 40 } }])
    .exec()
    .then((questionList) => {
      res.status(200).json(questionList);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/saveUserAnswers", questionController.saveUserAnswers);

module.exports = router;
