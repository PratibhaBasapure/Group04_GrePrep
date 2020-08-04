//  Author: Pratibha B(B00847415)
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

const ctrlUser = require("../controllers/user.controller");
const jwtHelper = require("../config/jwtHelper");

router.post("/register", ctrlUser.register);
router.post("/authenticate", ctrlUser.authenticate);
router.get("/userProfile", jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.post("/userProfile/updateUserDetails", ctrlUser.updateUserDetails);
router.post("/userProfile/updateUserPassword", ctrlUser.updateUserPassword);
router.post("/userProfile/deleteUser", ctrlUser.deleteUser);

module.exports = router;
