//Author- Neelesh Singh
const express = require("express");
const router = express.Router();
const range = require("../models/range.model");
const mock = require("../models/tests");
const ctrlPredictor = require("../controllers/predictor.controller");
//Post request to send the response
router.post("/uploadExcel", ctrlPredictor.updateRangeExcel);
router.post("/addRange", ctrlPredictor.addRange);
router.post("/predict", ctrlPredictor.predictColleges);

// Post request to save the mock test score to the database
router.post("/addHistory", ctrlPredictor.addMockTest);

module.exports = router;
