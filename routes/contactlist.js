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
            res.render("contactlist/contactlist", {ContactList: ContactList});
        }
    });
});


/* GET Route for displaying the Add page - CREATE Operation */
router.get("/add", (req, res, next) =>{

});

/* POST Route for processing the Add page - CREATE Operation */
router.post("/add", (req, res, next) =>{

});

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get("/edit/:id", (req, res, next) =>{

});

/* POST Route for processing the Edit page - UPDATE Operation */
router.post("/edit/:id", (req, res, next) =>{

});

/* GET Route for displaying the Delete page - DELETE Operation */
router.get("/delete/:id", (req, res, next) =>{

});

module.exports = router;