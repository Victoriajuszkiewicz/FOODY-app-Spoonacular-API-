var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");

var favoritesRouter = require("./routes/favorites"); //here i am importing favorites file in the routes

var app = express();
const cors = require("cors"); // add at the top

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); // add after 'app' is created
// app.use(express.static(path.join(__dirname, 'public')));

// if you add something in .js file after the / THEN don't add anything here
app.use("/api/", indexRouter);
app.use("/api/", usersRouter);
app.use("/api/", authRouter);
app.use("/api/", favoritesRouter); //here i am saying all the methods i create in the favorites.js file apply them in /favorites route

module.exports = app;
