const router = require("express").Router();
const Controller = require("../controllers/user");

var Auth0Strategy = require("passport-auth0"),
  passport = require("passport");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn();

router.get("/signup", Controller.signup.get);
router.post("/signup", Controller.signup.post);
router.get("/users/:userName", ensureLoggedIn, Controller.user.get);
router.get(
  "/login",
  passport.authenticate("auth0", {
    scope: "openid email profile app_metadata roles"
  }),
  function(req, res) {
    res.redirect("/");
  }
);
router.get(
  "/callback",
  passport.authenticate("auth0", { failureRedirect: "/login" }),
  function(req, res) {
    if (!req.user) {
      throw new Error("user null");
    }
    res.redirect("/dashboard");
  }
);
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
router.get("/dashboard", Controller.dashboard.get);
module.exports = router;
