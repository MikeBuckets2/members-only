const pool = require("./pool");

async function createUser(firstName, lastName, email, hashedPassword, isAdmin) {
  const { rows } = await pool.query(
    `INSERT INTO users (first_name, last_name, email, password, is_admin)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [firstName, lastName, email, hashedPassword, isAdmin || false]
  );
  return rows[0];
}

async function getUserByEmail(email) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  return rows[0];
}

async function updateMemberStatus(userId) {
  await pool.query(
    "UPDATE users SET is_member = TRUE WHERE id = $1",
    [userId]
  );
}

async function getAllMessages() {
  const { rows } = await pool.query(`
    SELECT messages.*, users.first_name, users.last_name
    FROM messages
    LEFT JOIN users ON messages.user_id = users.id
    ORDER BY messages.created_at DESC
  `);
  return rows;
}

async function createMessage(title, text, userId) {
  const { rows } = await pool.query(
    "INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3) RETURNING *",
    [title, text, userId]
  );
  return rows[0];
}

async function deleteMessage(id) {
  await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateMemberStatus,
  getAllMessages,
  createMessage,
  deleteMessage,
};