//Author- Neelesh Singh
const mongoose = require("mongoose");
// the fields of the object and its datatype
const range = mongoose.Schema({
  rangeID: {
    type: Number,
  },
  score: {
    type: Number,
  },
  colleges: {
    type: [String],
    required: true,
    String,
  },
});

module.exports = mongoose.model("Range", range);
