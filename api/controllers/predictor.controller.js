//Author- Neelesh Singh
// Modified by Padmesh Donthu
const mongoose = require("mongoose");
const Range = mongoose.model("Range");
const History = mongoose.model("MarksHistory");
const _ = require("lodash");
var fs = require("fs");
const xlsxFile = require("read-excel-file/node");
var IncomingForm = require("formidable").IncomingForm;
const { floor } = require("lodash");

// Adds the mock test score to the database for the user.
module.exports.addMockTest = (req, res, next) => {
  var history = new History();
  var data = {
    score: req.body.mockTest,
    createdDate: new Date(),
    mockTestId: req.body.mockTestId,
  };
  History.find({ userEmailID: req.body.userEmailID }, (err, document) => {
    if (!err && document.length == 1) {
      if (document[0].mockTests == null) {
        document[0].mockTests = [];
      }
      document[0].mockTests.push(data);
      document[0].save((err, result) => {
        if (!err) res.send(result);
        else {
          return next(err);
        }
      });
    } else {
      history.userEmailID = req.body.userEmailID;
      history.mockTests = [];
      history.mockTests.push(data);
      history.save((err, result) => {
        if (!err) res.send(result);
        else {
          return next(err);
        }
      });
    }
  });
};
//adding the range of scores
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
//getting the user
module.exports.predictColleges = async (req, res, next) => {
  var history = [];
  await History.find({ userEmailID: req.body.userEmailID }, (err, document) => {
    if (!err && document.length == 1) {
      for (var i = 0; i < document[0].mockTests.length; i++) {
        history.push(document[0].mockTests[i].score);
      }
    } else {
      console.log("I am here!");
      res.send({
        DreamColleges: [],
        ReachColleges: [],
        SafeColleges: [],
        Score: -1,
      });
    }
  });

  if (history.length != 0) {
    const sortedScore = history.sort(function (a, b) {
      return b - a;
    });
    var score = sortedScore[0];

    Range.find({}, (err, ranges) => {
      if (!err) {
        var rangeMap = {};
        ranges.forEach((range) => {
          rangeMap[range.rangeID] = range.colleges;
        });
        //dividing the categories of the schools based on values
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
        //sending the response
        res.send({
          DreamColleges: dreamColleges,
          ReachColleges: reachColleges,
          SafeColleges: safeColleges,
          Score: score,
        });
      } else {
        return next(err);
      }
    });
  }
};
//exporting the excel
module.exports.updateRangeExcel = (request, res, next) => {
  var form = new IncomingForm();

  form.uploadDir = "uploads";
  form.keepExtensions = true;
  form.parse(request, function (err, fields, files) {
    if (err) {
    } else if (!files.uploads) {
    } else {
      var file = files.uploads;
      var new_file_name = __dirname + "/../uploads/" + file.name;
      fs.renameSync(file.path, new_file_name);
      var list_of_documents = [];
      xlsxFile(new_file_name).then((rows) => {
        for (i in rows) {
          if (i == 0) {
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
