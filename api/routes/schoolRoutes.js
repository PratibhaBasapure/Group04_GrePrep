const express = require("express");
const router = express.Router();
const { School } = require("../models/school");

//The get route /schoolRanking/ route to get all the school details from the database
router.get("/", (req, res) => {
  School.find()
    .exec()
    .then((schools) => {
      res.status(200).json(schools);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
