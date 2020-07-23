var express = require("express");
var path = require("path");

var bodyParser = require("body-parser");
const mongoose = require("mongoose");

const rtsUser = require("./api/routes/user.router");
const passport = require('passport');
require('./api/config/passportConfig');

const mongoUrl =
  "mongodb+srv://admin:dbadmin@greprep.ym7uf.mongodb.net/greprep?retryWrites=true&w=majority";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(passport.initialize());
app.use('/user', rtsUser);

module.exports = app;
