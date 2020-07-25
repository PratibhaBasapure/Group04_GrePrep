const mongoose = require('mongoose');

var School = mongoose.model('School', {
    id: {type: Number},
    name: {type: String},
    description: {type: String},
    globalRank: {type: Number},
    csRank: {type: Number},
    eceRank: {type: Number},
    mechRank: {type: Number},
    imageURL: {type: String}
});

module.exports = {School};