const mongoose = require("mongoose");

var UserSchool = mongoose.model("UserSchool", {
  userId: {
    type: String,
    required: true,
  },
  favouriteSchools: [
    {
      schoolId: {
        type: Number,
      },
      schoolName: {
        type: String,
      },
      schoolType: {
        type: Number,
      },
    },
  ],
});

module.exports = { UserSchool };
