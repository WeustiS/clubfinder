var Club = require("../models/club");
var User = require("../models/user");
var Event = require("../models/event");
var url = require("url");

module.exports = {
  new_club: {
    get(req, res) {
      res.render("new");
    },

    post(req, res) {
      const { clubName, clubDesc, clubDues, clubPics, clubDate } = req.body;
      Club.create({ clubName, clubDesc, clubDues, clubPics, clubDate }).then(
        () => {
          res.redirect("/clubs");
        }
      );
    }
  },
  view_club: {
    get(req, res) {
      console.log(req.params.clubName + "test");
      Club.findOne({ clubName: req.params.clubName }, function(err, club) {
        if (err) res.redirect("/clubs");
        console.log(club);
        res.locals.club = club;
        res.render("clubs/club", club);
      });
    }
  },
  events: {
    get(req, res) {
      console.log("GETTING");
      Club.find(function(err, clubs) {
        console.log("Club = " + clubs);
        res.locals.clubs = clubs;
        res.render("events", clubs);
      });
    },
    post(req, res) {
      console.log("Posting event");
      var {
        eventClubName,
        eventName,
        eventDesc,
        eventDate,
        eventNotify
      } = req.body;
      if (eventNotify == "on") eventNotify = true;
      else eventNotify = false;
      Event.create({
        eventClubName,
        eventName,
        eventDesc,
        eventDate,
        eventNotify
      });
      res.redirect("/");
      // add the event to the club
    }
  }
};
