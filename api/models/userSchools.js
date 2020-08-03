const mongoose = require("mongoose");

// const userSchoolsSchema = mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   userId: {
//     type: String,
//     required: true,
//   },
//   favouriteSchools: [
//     {
//       schoolId: {
//         type: Number,
//       },
//       schoolName: {
//         type: String,
//       },
//       schoolType: {
//         type: Number,
//       }
//     },
//   ]
// });

// module.exports = mongoose.model(
//   "userSchools",
//   userSchoolsSchema,
//   "userSchools"
// );

var UserSchool = mongoose.model('UserSchool', {
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
          }
        },
    ]
});

module.exports = {UserSchool};