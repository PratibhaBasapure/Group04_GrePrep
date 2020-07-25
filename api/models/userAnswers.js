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
      answers: [
        {
          type: Number,
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
