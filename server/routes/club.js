const router = require("express").Router();
const Controller = require("../controllers/club");

router.get("/clubs/new", Controller.new_club.get);
router.post("/clubs/new", Controller.new_club.post);
router.get("/c/:clubName", Controller.view_club.get);
router.get("/clubs/events", Controller.events.get);
router.post("/clubs/events", Controller.events.post);

module.exports = router;
