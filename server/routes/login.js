const router = require("express").Router();
const Controller = require("../controllers/login");
router.get("/login", Controller.login.get);

module.exports = router;