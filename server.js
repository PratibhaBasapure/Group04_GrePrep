var app = require("./app");
var http = require("http");
var express = require("express");
var path = require("path");
const cors = require("cors");
var port = process.env.PORT || "8080";

app.use(express.static(__dirname + "/dist/GrePrep"));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
  next();
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/GrePrep/index.html"));
});

var server = http.createServer(app);
server.listen(port);
