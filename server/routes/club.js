let express = require("express");
let Controller = require("../controllers/club");
let router = express.Router();

router.get("/", Controller.index.get);
router.get("/new", Controller.new.get);
router.post("/new", Controller.new.post);
router.get("/:clubName", Controller.club.get);

module.exports = router;
