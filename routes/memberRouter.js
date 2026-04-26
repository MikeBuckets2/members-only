const { Router } = require("express");
const controller = require("../controllers/memberController");
const { ensureLoggedIn } = require("../middleware/auth");

const router = Router();

router.get("/join", ensureLoggedIn, controller.getJoinClub);
router.post("/join", ensureLoggedIn, controller.postJoinClub);

module.exports = router;