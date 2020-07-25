const express = require("express");
const router = express.Router();
const { School } = require("../models/school");

router.get("/", (req, res) => {
    School.find()
      .exec()
      .then((schools) => {
        res.status(200).json(schools);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;