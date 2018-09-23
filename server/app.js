// const url = require("url");
// const http = require("http");
const resolve = require("path").resolve;
// const axios = require("axios");
const mongoose = require("mongoose");

var mongoDB =
  "mongodb+srv://admin:123@clubfinder-drcr3.mongodb.net/test?retryWrites=true";
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("views", resolve(__dirname, "./../client/views")); // specify the views directory
app.set("view engine", "pug"); // register the template engine

// nodemon

mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;

var db = mongoose.connection;

app.get("/", function(req, res) {
  res.render("index", { Name: "William" });
});

db.on("connected", () => {
  app.listen(3000, function() {
    console.log("Listening http://localhost:3000");
  });
});

/*
 
*/
