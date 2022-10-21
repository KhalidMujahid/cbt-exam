require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const PORT = process.env.PORT || 3000;
const app = express();

// session set up
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
  })
);

// import db
require("./config/database");

// middlewares
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/", require("./routes/router"));
app.use("/", require("./routes/admin.route"));
app.use("/", require("./routes/student.route"));

app.listen(PORT, () => console.log("Server running on port...", PORT));
