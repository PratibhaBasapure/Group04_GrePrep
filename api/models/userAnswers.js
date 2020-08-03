// Author - Padmesh Donthu
const mongoose = require("mongoose");

const userAnswersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: String,
    required: true,
  },
  questionAnswers: [
    {
      questionId: {
        type: Number,
      },
      questionTitle: {
        type: String,
      },
      answers: [
        {
          type: Number,
        },
      ],
      actualAnswers: [
        {
          type: String,
        },
      ],
      options: [
        {
          type: String,
        },
      ],
    },
  ],
  testType: {
    type: String,
  },
});

module.exports = mongoose.model(
  "userAnswers",
  userAnswersSchema,
  "userAnswers"
);
