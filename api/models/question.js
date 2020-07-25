// Author - Padmesh Donthu
const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  questionId: {
    type: Number,
  },
  title: { type: String },
  type: { type: String },
  subType: { type: String },
  image: { type: String },
  answer: [
    {
      type: String,
    },
  ],
  options: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("question", questionSchema, "question");
