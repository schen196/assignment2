let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// connect to contact model
let contact = require("../models/contactlist");

/* GET Route for contact list page - READ Operation */
router.get("/", (req, res, next) => {
    contact.find((err, ContactList) => {
        if (err){
            return console.error(err);
        }
        else {
            res.render("pages/contactlist", {ContactList: ContactList});
        }
    });
});

module.exports = router;