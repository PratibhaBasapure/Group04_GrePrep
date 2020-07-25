const mongoose = require("mongoose");

const range = mongoose.Schema({
    rangeID: {
        type: Number
    },
    score: {
        type: Number

    },
    colleges: {
        type: [String],
        required: true, String
    }
});


module.exports = mongoose.model("Range", range);
