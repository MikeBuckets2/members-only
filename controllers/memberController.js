const { updateMemberStatus } = require("../db/queries");

function getJoinClub(req, res) {
  res.render("join-club", {
    title: "Join the Club",
    error: null,
  });
}

async function postJoinClub(req, res) {
  const { passcode } = req.body;

  if (passcode !== process.env.MEMBER_PASSCODE) {
    return res.status(400).render("join-club", {
      title: "Join the Club",
      error: "Wrong passcode. Try again.",
    });
  }

  try {
    await updateMemberStatus(req.user.id);
    // Update the session user object so the change reflects immediately
    req.user.is_member = true;
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating membership.");
  }
}

module.exports = { getJoinClub, postJoinClub };