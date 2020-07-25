const express = require("express");
const router = express.Router();
const range = require("../models/range.model");
const mock = require("../models/mock.model");
const ctrlPredictor = require("../controllers/predictor.controller");

router.post("/uploadExcel", ctrlPredictor.updateRangeExcel);
router.post("/addRange", ctrlPredictor.addRange);
router.get("/predict", ctrlPredictor.predictColleges);
router.post("/addHistory", ctrlPredictor.addMockTest);

module.exports = router;
