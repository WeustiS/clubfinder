var Club = require("../models/club");

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
      const { name, desc } = req.body;

      Club.create({ name, desc })
        .then(() => {
          console.log("Club Added");
          res.redirect("/club");
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
