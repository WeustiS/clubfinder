require("dotenv").config();
const resolve = require("path").resolve;
const mongoose = require("mongoose");
const authMiddleware = require("./middlewares/auth");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

mongoose.connect(
  process.env.MONGOSERVER,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("views", resolve(__dirname, "./views/pages")); // specify the views directory
app.set("view engine", "pug"); // register the template engine

app.use(session(authMiddleware.session));
app.use(passport.initialize());
app.use(cookieParser("temp secret")); // make this into a .env variable one day
app.use(flash());
app.use(passport.session());
app.use(express.static("public"));
app.use(authMiddleware.loggedIn); // this is adding it as middleware
// app.use(authMiddleware.isVerified);

app.use("/", require("./routes/club"));
app.use("/", require("./routes/user"));
app.use("/", require("./routes/clubs"));
app.use("/", require("./routes/index"));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(authMiddleware.strategy());

db.on("connected", () => {
  app.listen(3000, function() {
    console.log("Listening http://localhost:3000");
  });
});
