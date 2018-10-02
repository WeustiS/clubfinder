var Club = require("../models/club");
var url = require("url");

module.exports = {
  index: {
    get(req, res) {
      Club.find()
        .then(clubs => {
          console.log(clubs);
          res.locals.clubs = clubs;
          res.render("clubs/clubs");
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  new: {
    get(req, res) {
      res.render("clubs/new");
    },

    post(req, res) {
      const { clubName, clubDesc, clubDues, clubPics, clubDate } = req.body;
      Club.create({ clubName, clubDesc, clubDues, clubPics, clubDate })
        .then(() => {
          res.redirect("/clubs");
        })
        .catch(err => {
          console.error(err);
        });
    }
  },

  club: {
    get(req, res) {
      console.log(req.params.clubName);
      club = Club.find({ clubName: req.params.clubName }, (err, club) => {
        if (err) res.redirect("/clubs");
        if (club.length > 1) res.redirect("/clubs");
        console.log(club[0]);
        res.render("clubs/club", club[0]);
      });
    }
  }
};
