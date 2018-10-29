const router = require("express").Router();
const Controller = require("../controllers/index");

router.get("/", Controller.index.get);

module.exports = router;
