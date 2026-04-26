const { body, validationResult } = require("express-validator");
const { getAllMessages, createMessage, deleteMessage } = require("../db/queries");

const validateMessage = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 255 })
    .withMessage("Title must be 255 characters or less."),
  body("text")
    .trim()
    .notEmpty()
    .withMessage("Message text is required."),
];

async function getIndex(req, res) {
  try {
    const messages = await getAllMessages();
    res.render("index", { title: "The Club", messages });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading messages.");
  }
}

function getNewMessage(req, res) {
  res.render("new-message", {
    title: "New Post",
    errors: [],
    formData: {},
  });
}

async function postNewMessage(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("new-message", {
      title: "New Post",
      errors: errors.array(),
      formData: req.body,
    });
  }

  const { title, text } = req.body;

  try {
    await createMessage(title.trim(), text.trim(), req.user.id);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error posting message.");
  }
}

async function postDeleteMessage(req, res) {
  try {
    await deleteMessage(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting message.");
  }
}

module.exports = {
  validateMessage,
  getIndex,
  getNewMessage,
  postNewMessage,
  postDeleteMessage,
};