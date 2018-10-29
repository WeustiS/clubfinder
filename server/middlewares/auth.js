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
    if (
      req.session.passport &&
      typeof req.session.passport.user !== "undefined"
    ) {
      res.locals.loggedIn = truegedIn = true;
      console.log(req.user._json);
      res.locals.user = req.user._json;
    }
    next();
  }
};
