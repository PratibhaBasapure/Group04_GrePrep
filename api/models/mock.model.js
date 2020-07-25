const mongoose = require("mongoose");

const history = mongoose.Schema({
    userEmailID: {
        type: String
    },
    mockTests: {type: Map, of: Number} ,
    generalTests: {type: Map, of: Number} 
});


module.exports = mongoose.model("MarksHistory", history);
