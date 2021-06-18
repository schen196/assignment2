// File Name: Assignment 2: Express Portfolio - Authentication
// Student Name: Steven Chen
// Student Number: 301159710
// Date: May 31, 2021

let express = require("express");
const passport = require("passport");
let router = express.Router();

let indexController = require("../controllers/index");

/* GET home page. */
router.get("/", indexController.displayHomePage);

/* GET about page. */
router.get("/about", indexController.displayAbout);

/* GET contact page. */
router.get("/contact", indexController.displayContact);

/* GET services page. */
router.get("/services", indexController.displayServices);
	

/* GET projects page. */
router.get("/projects", indexController.displayProjects);
	

/* GET register page. */
router.get("/register", indexController.displayRegister);

/* GET login page. */
router.get("/login", indexController.displayLogin);

module.exports = router;
