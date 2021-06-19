// File Name: Assignment 2: Express Portfolio - Authentication
// Student Name: Steven Chen
// Student Number: 301159710
// Date: May 31, 2021

// express
var express = require("express");

// other dependencies
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// modules for authentication
var session = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');
var locatStrategy = passportLocal.Strategy;
var flash = require('connect-flash');

// Instantiate an Express app and setup middlewares
var app = express();

// database setup
let mongoose = require("mongoose");
let DB = require("./db");

// point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true,  useUnifiedTopology: true });

let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error:"));
mongoDB.once("open", ()=>{
	console.log("Connected to MongoDB...");
});

//routers
var indexRouter = require("../routes/index");
let accountsRouter = require("../routes/account");
let contactRouter = require("../routes/contact");


// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secretString'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", indexRouter);
app.use('/accounts', accountsRouter);
app.use("/contact-list", contactRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// setup express session
app.use(session({
	secret: "someSecret",
	saveUninitialized: false,
	resave: false
}))

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// passport user configuration

// create a Account Model Instance
let accountModel = require('../models/account');
let Account = accountModel.Account;

// implement account authentication strategy
passport.use(Account.createStrategy());

// serialize and deserialize the Account info
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});



module.exports = app;
