var Auth0Strategy = require("passport-auth0");

module.exports = {
  session: {
    secret: process.env.AUTH0_API_KEY,
    cookie: {},
    resave: false,
    saveUninitialized: true
  },
  strategy() {
    return new Auth0Strategy(
      {
        domain: "club-finder.auth0.com",
        clientID: "nRUcwhBsGtTXnhiAdwsFQAraJaUFxkyU",
        clientSecret: process.env.AUTH0_API_KEY, // Replace this with the client secret for your app
        callbackURL: "http://localhost:3000/callback",
        state: true
      },
      function(accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
      }
    );
  },
  loggedIn(req, res, next) {
    res.locals.loggedIn = false;
    console.log("test");
    if (
      req.session.passport &&
      typeof req.session.passport.user !== "undefined"
    ) {
      res.locals.loggedIn = true;
      res.locals.user = {
        ...req.user._json,
        role: req.user._json["https://localhost:8080"]
      };
    }
    next();
  },
  isVerified(req, res, next) {
    if (
      req.session.passport &&
      typeof req.session.passport.user !== "undefined"
    ) {
      if (req.user._json.email_verified) {
        next();
      }
      req.flash("error", "You must verify your email"); // this will write the error message to the flash storage
      req.logout();
      res.redirect("/");
    }
    next(); // else (this runs if the user is not logged in) - continue to the next...
  }
};
