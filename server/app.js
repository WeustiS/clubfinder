require("dotenv").config();
const resolve = require("path").resolve;
const mongoose = require("mongoose");

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var session = require("express-session");
var Auth0Strategy = require("passport-auth0"),
  passport = require("passport");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("views", resolve(__dirname, "./views/pages")); // specify the views directory
app.set("view engine", "pug"); // register the template engine

// var sess = {
//   secret: process.env.AUTH0_API_KEY,
//   cookie: {},
//   resave: false,
//   saveUninitialized: true
// };

app.use(session(require("./middlewares/passport").session));
// app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

// nodemon
app.use(express.static("public"));
mongoose.connect(
  process.env.mongoDBHost,
  { useNewUrlParser: true }
);

mongoose.Promise = global.Promise;

var db = mongoose.connection;

app.use(function(req, res, next) {
  res.locals.loggedIn = false;
  if (
    req.session.passport &&
    typeof req.session.passport.user !== "undefined"
  ) {
    res.locals.loggedIn = truegedIn = true;
    //   console.log(req.user);
    res.locals.user = req.user._json;
  }
  next();
});

app.get("/", function(req, res) {
  res.render("index", { Name: "William" });
});

app.use("/", require("./routes/club"));
app.use("/", require("./routes/user"));

var strategy = new Auth0Strategy(
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

passport.serializeUser(function(user, done) {
  done(null, user);
});
``;

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(strategy);

db.on("connected", () => {
  app.listen(3000, function() {
    console.log("Listening http://localhost:3000");
  });
});

/*



*/
