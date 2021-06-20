const { resolveInclude } = require("ejs");
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

let loggedInUser = null;

// create the account model instance
let accountModel = require("../models/account");
let Account = accountModel.Account; // alias

module.exports.getLoggedInUser = () => loggedInUser;

module.exports.displayHomePage = (req, res, next) => {
    res.render("pages/homepage", {loggedInUser});
}

module.exports.displayAbout = (req, res, next) => {
	res.render("pages/about", {loggedInUser});
};

module.exports.displayContact = (req, res, next) => {
	res.render("pages/contact", {loggedInUser});
};

module.exports.displayServices = (req, res, next) => {
    res.render("pages/services", {loggedInUser});
};

module.exports.displayProjects = (req, res, next) => {
    res.render("pages/projects", {loggedInUser});
};

module.exports.displayRegister = (req, res, next) => {
    res.render("pages/register", {loggedInUser});
};

module.exports.displayLogin = (req, res, next) => {
    if(!req.Account){
        res.render("pages/login", {
            title: "Login",
            loggedInUser
        })
    } else {
        return res.redirect('/');
    }
};


module.exports.processLoginPage = (req,res, next) => {
    passport.authenticate("local", (err, account) => {
        //server error?
        if(err){
            return next(err);
        }
        // is there a account login error?
        if(!account){
            req.flash("loginMessage", "Authentication Error");
            return res.render("pages/login", {
                title: "Login",
                messages: req.flash("loginMessage"),
                loggedInUser
            })
        }
        req.login(account, (err) => {
            //server error?
            if(err){
                return next(err);
            }
            loggedInUser = account;
            return res.redirect('/contact-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the account is not already logged in
    if(!req.account){
        res.render("pages/register",
        {
            title: "Register",
            messages: req.flash("registerMessage", "Register an Account."),
            loggedInUser
        });
    }
    else{
        
        return res.redirect("/contact-list");
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a account object
    let newAccount = new Account({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email

    });

    Account.register(newAccount, req.body.password, (err, account) => {
        if(err){
            console.log("Error: Inserting New Account");
            if(err.name == "UserExistsError"){
                req.flash(
                    "registerMessage",
                    "Registration Error: Account Already Exists!"
                );
            }
            return res.render("pages/register",
            {
                title: "Register",
                messages: req.flash("registerMessage"),
                loggedInUser
            });
        }
        else
        {
            // if no error exists, then registration is successful
            // redirect the account and authenticate them

            return passport.authenticate("local")(req, res, () => {
                res.redirect("/")
            });
        }
    })
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    loggedInUser = null;
    res.redirect("/");
}