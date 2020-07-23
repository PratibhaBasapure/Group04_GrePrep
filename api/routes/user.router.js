const express = require('express');
const router = express.Router();
const User = require("../models/user.model");

const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);

module.exports = router;



