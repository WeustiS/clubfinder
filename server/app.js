const resolve = require("path").resolve;
const mongoose = require("mongoose");

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("views", resolve(__dirname, "./views/pages")); // specify the views directory
app.set("view engine", "pug"); // register the template engine

// nodemon
app.use(express.static("public"));
mongoose.connect(process.env.mongoDBHost);

mongoose.Promise = global.Promise;

var db = mongoose.connection;

app.get("/", function(req, res) {
  res.render("index", { Name: "William" });
});

app.use("/", require("./routes/club"));

db.on("connected", () => {
  app.listen(3000, function() {
    console.log("Listening http://localhost:3000");
  });
});
