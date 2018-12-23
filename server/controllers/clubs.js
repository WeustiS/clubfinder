var Club = require("../models/club");
var User = require("../models/user");
var Event = require("../models/event");
var url = require("url");

module.exports = {
  clubs: {
    get(req, res) {
      console.log("getting index");
      Club.find()
        .then(clubs => {
          res.locals.clubs = clubs;
          res.render("clubs");
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
