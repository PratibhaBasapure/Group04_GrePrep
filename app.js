var express = require("express");
var path = require("path");

var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const question = require("./api/routes/question");

const rtsUser = require("./api/routes/user.router");

const passport = require("passport");
require("./api/config/passportConfig");

const predictorRouter = require("./api/routes/predictor.router")
const passport = require('passport');
require('./api/config/passportConfig');
b50a72139d5789833558f0c6b303af7a6

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
app.use('/predictor', predictorRouter)


app.use("/question", question);

app.use(passport.initialize());
app.use("/user", rtsUser);
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach((key) =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  } else {
    console.log(err);
  }
});
module.exports = app;
