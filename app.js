const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// var items = ["Buy Food", "Cook Food", "Eat Food"];
// var workItems = [];

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/todolistDB', {
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected!");
  })
  .catch((err) => {
    console.log("Oh no! There was an error");
    console.log(err);
  })

const itemsSchema = new mongoose.Schema({
  name: String
});

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
});

const Item = mongoose.model("Item", itemsSchema);
const List = mongoose.model("List",listSchema);

const item1 = new Item({
  name: "Buy Food"
});

const item2 = new Item({
  name: "Cook Food"
});

const item3 = new Item({
  name: "Eat Food"
});

const defaultItems = [item1, item2, item3];

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  var today = new Date();
  // var currentDate = today.getDay();
  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  var day = today.toLocaleDateString('en-US', options);

  Item.find({}, function(err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) console.log(err);
        else console.log("Success");
      });
      res.redirect("/");
    } else {
      res.render('list', {
        listTitle: day,
        newListItem: foundItems
      });
    }
  });

});

app.get("/:customListName",function(req,res){
  const customListName = req.params.customListName;

  List.findOne({name:customListName},function(err,foundList){
    if(!err){
      if(!foundList){
        const item = new List({
          name:customListName,
          items: defaultItems
        });

        item.save();

        res.redirect("/" + customListName);
      } else{
        res.render("list",{
          listTitle: foundList.name,
          newListItem: foundList.items
        });
      }
    }
  });



});

app.get("/about", function(req, res) {
  res.render('about');
});

app.post("/", function(req, res) {
  // console.log(req.body);
  const itemName = req.body.newItem;

  const newItem = new Item({
    name: itemName
  });

  newItem.save();

  res.redirect("/");

});

app.post("/delete",function(req,res){
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId,function(err){
    if(err) console.log(err);
  });
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Port is running");
});
