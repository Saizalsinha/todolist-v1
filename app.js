const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
  var today = new Date();
  var currentDate = today.getDay();
  var day = "";
  if (currentDate === 0) {
    day = "sunday";
  } else if (currentDate === 1) {
    day = "Monday";
  } else if (currentDate === 2) {
    day = "Tuesday";
  } else if (currentDate === 3) {
    day = "Wednesday";
  } else if (currentDate === 4) {
    day = "Thursday";
  } else if (currentDate === 5) {
    day = "Friday";
  } else if (currentDate === 6) {
    day = "Saturday";
  }

  res.render('list',{listOfDay:day});
});

app.listen(3000, function () {
  console.log("Port is running");
});
