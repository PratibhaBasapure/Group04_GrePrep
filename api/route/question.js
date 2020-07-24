const express = require("express");
const router = express.Router();
const Question = require("../model/question");

router.get("/", (req, res) => {
  Question.find()
    .exec()
    .then((questionList) => {
      res.status(200).json(questionList);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
