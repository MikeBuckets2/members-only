require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const flash = require("connect-flash");
const passport = require("./config/passport");
const pool = require("./db/pool");

const authRouter = require("./routes/authRouter");
const memberRouter = require("./routes/memberRouter");
const messageRouter = require("./routes/messageRouter");
const messageController = require("./controllers/messageController");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new pgSession({
      pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.get("/", messageController.getIndex);
app.use("/", authRouter);
app.use("/", memberRouter);
app.use("/", messageRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});