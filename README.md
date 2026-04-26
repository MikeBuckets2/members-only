# Members Only

A message board where posts are anonymous to the public. Sign up and join the club to see who's talking.

## How It Works

| Role | See posts | See author + date | Delete posts |
|------|-----------|-------------------|--------------|
| Guest | Yes | No | No |
| User | Yes | No | No |
| Member | Yes | Yes | No |
| Admin | Yes | Yes | Yes |

## Tech Stack

- Node.js / Express
- EJS
- PostgreSQL
- Passport.js (local strategy)
- bcryptjs
- express-validator
- express-session + connect-pg-simple

## Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/members-only.git
cd members-only
npm install
```

Create `.env`:

```
DATABASE_URL=your_connection_string
SESSION_SECRET=a_long_random_string
MEMBER_PASSCODE=your_chosen_passcode
```

Set up the database:

```bash
node db/populatedb.js
```

Start the server:

```bash
node app.js
```

Visit `http://localhost:3000`.

## Becoming a Member

Log in and visit `/join`. Enter the `MEMBER_PASSCODE` from your `.env`.

## Becoming an Admin

Check the "Sign up as Admin" checkbox when creating your account.