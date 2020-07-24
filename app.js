var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const question = require("./api/route/question");
const mongoUrl =
  "mongodb+srv://admin:dbadmin@greprep.ym7uf.mongodb.net/greprep?retryWrites=true&w=majority";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));

app.use("/question", question);

module.exports = app;
