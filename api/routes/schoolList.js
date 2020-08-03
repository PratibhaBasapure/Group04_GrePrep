const express = require("express");
const router = express.Router();
const { UserSchool } = require("../models/userSchools");
const schoolController = require("../controllers/school");

//The get route /mySchools/ route to get all the school details from the database
router.get("/myschools", (req, res) => {
  UserSchool.find()
    .exec()
    .then((userSchools) => {
      res.status(200).json(userSchools);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  UserSchool.findOne({ userId: req.params.id }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      res.send([]);
    }
  });
});

router.post("/addSchools", (req, res) => {
  UserSchool.find({ userId: req.body.userId }, (err, document) => {
    if (document.length == 1) {
      document[0].favouriteSchools = [...req.body.favouriteSchools];
      document[0].save((err, result) => {
        if (!err) {
          res.send(true);
        } else {
          res.send(false);
        }
      });
    } else {
      var school = new UserSchool({
        userId: req.body.userId,
        favouriteSchools: req.body.favouriteSchools,
      });
      school.save((err, result) => {
        if (!err) {
          res.send(true);
        } else {
          res.send(false);
        }
      });
    }
  });
});

router.put("/removeSchools", (req, res) => {
  UserSchool.find({ userId: req.body.userId }, (err, document) => {
    if (document.length == 1) {
      if (document[0].favouriteSchools.length != 1) {
        var favouriteSchools = document[0].favouriteSchools;
        var updatedFavouriteSchools = [];
        for (var favouriteSchool of favouriteSchools) {
          if (favouriteSchool.schoolId != req.body.schoolId) {
            updatedFavouriteSchools.push(favouriteSchool);
          }
        }
        document[0].favouriteSchools = updatedFavouriteSchools;
        document[0].save((err, result) => {
          if (!err) {
            res.send(true);
          } else {
            res.send(false);
          }
        });
      } else {
        UserSchool.findOneAndRemove({ userId: req.body.userId }, (err, doc) => {
          if (!err) {
            res.send(true);
          } else {
            res.send(false);
          }
        });
      }
    }
  });
});

module.exports = router;
