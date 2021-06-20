let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// connect to contact model
let contact = require("../models/contact");
const { getLoggedInUser } = require("../controllers/index");

/* GET Route for contact list page - READ Operation */
router.get("/", (req, res, next) => {
    if(!getLoggedInUser()) {
        return res.redirect("/login");
    }
    contact.find((err, ContactList) => {
        if (err){
            return console.error(err);
        }
        else {
            res.render("contactlist/contact", {ContactList, loggedInUser: getLoggedInUser()});
        }
    }).collation({locale: "en" })
    .sort({name: 1})
    .exec();
});

/* GET Route for displaying the Add page - CREATE Operation */
router.get("/add", (req, res, next) =>{
    res.render("contactlist/add", {title: "Add Contact"});
});

/* POST Route for processing the Add page - CREATE Operation */
router.post("/add", (req, res, next) =>{
    let newContact = contact({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    contact.create(newContact, (err, contact) =>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            // refresh the contact list
            res.redirect("/contact-list");
        }
    });
});

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get("/edit/:id", (req, res, next) =>{
    let id = req.params.id;

    contact.findById(id, (err, contactToEdit) =>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            // show the edit view
            res.render("contactlist/edit", {title: "Edit Contact", contact: contactToEdit, loggedInUser: getLoggedInUser()})
        }
    });
});

/* POST Route for processing the Edit page - UPDATE Operation */
router.post("/edit/:id", (req, res, next) =>{
    let id = req.params.id;

    let updatedContact = contact({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    contact.updateOne({_id: id}, updatedContact, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            // refresh the contact list
            res.redirect("/contact-list");
        }
    });
});

/* GET to perform deletion - DELETE Operation */
router.get("/delete/:id", (req, res, next) =>{
    let id = req.params.id;

    contact.deleteOne({_id: id}, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            // refresh the contact list
            res.redirect("/contact-list");
        }
    })
});

module.exports = router;