const mongoose = require("mongoose");
const Range = mongoose.model("Range");
const History = mongoose.model("MarksHistory");
const _ = require("lodash");
var fs = require("fs");
const xlsxFile = require("read-excel-file/node");
var IncomingForm = require("formidable").IncomingForm;
const { floor } = require("lodash");

module.exports.addMockTest = (req, res, next) => {
  var history = new History();
  var date = new Date();
  console.log(req.body.userEmailID);
  console.log(req.body.mockTest);
  History.find({ userEmailID: req.body.userEmailID }, (err, document) => {
    console.log(document.length);
    if (!err && document.length == 1) {
      var _mocktTests = document[0].mockTests;
      _mocktTests[date.getTime()] = req.body.mockTest;
      console.log(_mocktTests);
      document[0].mockTests = _mocktTests;
      console.log(document[0]);
      document[0].save((err, result) => {
        if (!err) res.send(result);
        else {
          return next(err);
        }
      });
    } else {
      history.userEmailID = req.body.userEmailID;
      var mockTestIndex = {};
      mockTestIndex[date.getTime()] = req.body.mockTest;
      history.mockTests = mockTestIndex;
      history.save((err, result) => {
        if (!err) res.send(result);
        else {
          return next(err);
        }
      });
    }
  });
};
module.exports.updateMockTest = (req, res, next) => {
  var history = new History();
  history.userEmailID = req.body.userEmailID;
  history.mockTests = req.body.mockTest;
  History.find({});
};

module.exports.addRange = (req, res, next) => {
  var range = new Range();
  range.rangeID = req.body.rangeID;
  range.score = req.body.score;
  range.colleges = req.body.colleges;
  range.save((err, result) => {
    if (!err) res.send(result);
    else {
      return next(err);
    }
  });
};
module.exports.predictColleges = async (req, res, next) => {
  var history = {};
  await History.find({ userEmailID: req.body.userEmailID }, (err, document) => {
    if (!err && document.length == 1) {
      console.log(document[0]);
      history = document[0].mockTests;
    } else {
      res.status(400).send(["User Doesnt not Exist"]);
      return next(err);
    }
  });
  const mapSort = new Map([...history.entries()].sort((a, b) => b[1] - a[1]));
  console.log(mapSort);
  var score = 0;
  for (let [key, value] of mapSort) {
    score = value;
    break;
  }
  Range.find({}, (err, ranges) => {
    if (!err) {
      var rangeMap = {};
      ranges.forEach((range) => {
        rangeMap[range.rangeID] = range.colleges;
      });

      var scoreIndex = 9 - floor(score / 5 - 59);

      var dreamColleges = [];
      var reachColleges = [];
      var safeColleges = [];
      if (score > 340) {
        score = 340;
        scoreIndex = 9 - floor(score / 5 - 59);
      }
      if (score < 295) {
        for (i = 0; i <= 9; i++) {
          dreamColleges = dreamColleges.concat(rangeMap[i]);
        }
      } else {
        for (i = scoreIndex + 1; i < 10; i++) {
          safeColleges = safeColleges.concat(rangeMap[i]);
        }
        reachColleges = rangeMap[scoreIndex];
        if (scoreIndex - 1 >= 0) {
          reachColleges = reachColleges.concat(rangeMap[scoreIndex - 1]);
        }
        for (i = 0; i <= scoreIndex - 2; i++) {
          dreamColleges = dreamColleges.concat(rangeMap[i]);
        }
      }
      res.send({
        DreamColleges: dreamColleges,
        ReachColleges: reachColleges,
        SafeColleges: safeColleges,
      });
    } else {
      return next(err);
    }
  });
};

module.exports.updateRangeExcel = (request, res, next) => {
  var form = new IncomingForm();

  form.uploadDir = "uploads";
  form.keepExtensions = true;
  console.log(request);
  form.parse(request, function (err, fields, files) {
    console.log(files);
    if (err) {
      console.log("some error", err);
    } else if (!files.uploads) {
      console.log("no file received");
      console.log(files);
    } else {
      var file = files.uploads;
      var new_file_name = __dirname + "/../uploads/" + file.name;
      fs.renameSync(file.path, new_file_name);
      var list_of_documents = [];
      xlsxFile(new_file_name).then((rows) => {
        for (i in rows) {
          console.log(rows[i].length);
          if (i == 0) {
            console.log(rows[i]);
          }
          if (i > 0) {
            var range = new Range();
            for (j in rows[i]) {
              if (j == 0) {
                range.rangeID = rows[i][j];
              }

              if (j == 1) {
                range.score = rows[i][j];
              }

              if (j == 2) {
                range.colleges = String(rows[i][j]).split(",");
              }
            }
            list_of_documents.push(range);
          }
        }
        Range.insertMany(list_of_documents);
        res.send(list_of_documents);
      });
    }
  });
};
