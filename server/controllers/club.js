var Club = require("../models/club");
var User = require("../models/user");
var Event = require("../models/event");
var url = require("url");

module.exports = {
  index: {
    get(req, res) {
      console.log("getting index");
      Club.find()
        .then(clubs => {
          console.log(clubs);
          res.locals.clubs = clubs;
          res.render("clubs");
        })
        .catch(err => {
          console.error(err);
        });
    },
    post(req, res) {
      var { userName, newClubToAdd } = req.body;
      // find user, get clubs, add this new club
      console.log("SEARCHING FOR " + userName);
      console.log(
        "Got POST request, userName = " + userName + "newClub = " + newClubToAdd
      );
      User.findOne({ userName: userName }, function(err, user) {
        if (user === null) {
          console.log("Account didn't exist");
          var userClubs = [newClubToAdd];
          console.log(userClubs);
          User.create({ userName, userClubs });
          res.render("index");
        } else {
          console.log("Account existed");
          if (user.userClubs === null) {
            console.log("Was null" + user);
          }
          console.log("Listing club object -- " + user);
          console.log("User = " + user);
          console.log("User clubs = " + user.userClubs);
          console.log("New club = " + user);
          if (err) res.redirect("index");
          if (!user.userClubs.includes(newClubToAdd)) {
            console.log("User was not in club");
            user.userClubs.push(newClubToAdd);
            console.log("Pushed new club " + user.userClubs);
            user.save(function(err, olduser) {
              if (err) res.send(err);
              console.log("Saved new club");
              res.render("index");
            });
          } else if (user.userClubs.includes(newClubToAdd)) {
            console.log("User was in club");
            res.render("index");
          }
        }
      });
    }
  },
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
