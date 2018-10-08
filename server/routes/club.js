let express = require("express");
let Controller = require("../controllers/club");
let router = express.Router();

router.get("/", Controller.index.get);
router.get("/new", Controller.new_club.get);
router.post("/new", Controller.new_club.post);
router.get("/c/:clubName", Controller.view_club.get);
router.post("/", Controller.index.post);
router.get("/events", Controller.events.get);
router.post("/events", Controller.events.post);

module.exports = router;
