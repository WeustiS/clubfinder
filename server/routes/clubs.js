const router = require("express").Router();
const Controller = require("../controllers/clubs");

router.get("/clubs", Controller.clubs.get);

module.exports = router;
