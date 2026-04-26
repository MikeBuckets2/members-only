require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  console.log("Connecting...");
  await client.connect();

  console.log("Creating users table...");
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      is_member BOOLEAN DEFAULT FALSE,
      is_admin BOOLEAN DEFAULT FALSE
    );
  `);

  console.log("Creating messages table...");
  await client.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  await client.end();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  client.end();
  process.exit(1);
});