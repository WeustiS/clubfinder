let express = require("express");
let Controller = require("../controllers/club");
let router = express.Router();

router.get("/clubs", Controller.index.get);
router.get("/clubs/new", Controller.new_club.get);
router.post("/clubs/new", Controller.new_club.post);
router.get("/c/:clubName", Controller.view_club.get);
router.post("/clubs", Controller.index.post);
router.get("/clubs/events", Controller.events.get);
router.post("/clubs/events", Controller.events.post);

module.exports = router;
