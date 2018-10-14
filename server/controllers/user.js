var User = require("../models/user");

module.exports = {
  signup: {
    get(req, res) {
      console.log("Getting signup page");
      res.locals.title = "Sign Up";
      res.render("users/signup");
    },
    post(req, res) {
      var { userFirstName, userLastName, userEmail, userPassword } = req.body;
      console.log(userFirstName, userLastName, userEmail, userPassword);
      User.findOne({ userEmail: userEmail }, function(err, user) {
        if (user === null) {
          console.log("Account didn't exist");
          User.create({ userFirstName, userLastName, userEmail, userPassword });
          res.render("index");
        } else {
          console.log("Account existed, would redirect to login");
          res.redirect("users/login"); // auth0
        }
      });
    }
  },
  user: {
    get(req, res) {
      res.render("users/user");
    }
  },
  dashboard: {
    get(req, res) {
      res.render("dashboard");
    }
  }
};
