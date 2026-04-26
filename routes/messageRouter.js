const { Router } = require("express");
const controller = require("../controllers/messageController");
const { ensureLoggedIn, ensureAdmin } = require("../middleware/auth");

const router = Router();

router.get("/messages/new", ensureLoggedIn, controller.getNewMessage);
router.post(
  "/messages/new",
  ensureLoggedIn,
  controller.validateMessage,
  controller.postNewMessage
);
router.post("/messages/:id/delete", ensureAdmin, controller.postDeleteMessage);

module.exports = router;