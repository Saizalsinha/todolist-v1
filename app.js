const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Buy Food", "Cook Food", "Eat Food"];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
  var today = new Date();
  // var currentDate = today.getDay();
  var options = {weekday:'long', day:'numeric', month: 'long'};
  var day = today.toLocaleDateString('en-US',options);

  res.render('list',{listOfDay:day,newListItem:items});
});

app.post("/", function(req,res){
  var item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Port is running");
});
