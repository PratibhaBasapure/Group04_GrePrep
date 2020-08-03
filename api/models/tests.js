// Author - Padmesh Donthu
const mongoose = require("mongoose");

const history = mongoose.Schema({
  userEmailID: {
    type: String,
  },
  mockTests: [
    {
      score: {
        type: Number,
      },
      createdDate: {
        type: Date,
      },
      mockTestId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  verbalTests: [
    {
      score: {
        type: Number,
      },
      createdDate: {
        type: Date,
      },
      verbalTestId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  quantTests: [
    {
      score: {
        type: Number,
      },
      createdDate: {
        type: Date,
      },
      quantTestId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  quizTests: [
    {
      score: {
        type: Number,
      },
      createdDate: {
        type: Date,
      },
      quizTestId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
});

module.exports = mongoose.model("MarksHistory", history, "testshistories");
