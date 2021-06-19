const { resolveInclude } = require("ejs");
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");


// create the account model instance
let accountModel = require("../models/account");
let Account = accountModel.Account; // alias

module.exports.displayHomePage = (req, res, next) => {
    res.render("pages/homepage");
}

module.exports.displayAbout = (req, res, next) => {
	res.render("pages/about");
};

module.exports.displayContact = (req, res, next) => {
	res.render("pages/contact");
};

module.exports.displayServices = (req, res, next) => {
    res.render("pages/services");
};

module.exports.displayProjects = (req, res, next) => {
    res.render("pages/projects");
};

module.exports.displayRegister = (req, res, next) => {
    res.render("pages/register");
};

module.exports.displayLogin = (req, res, next) => {
    if(!req.Account){
        res.render("pages/login", {
            title: "Login",
            messages: req.flash("loginMessage"),
            userName: req.account ? req.account.username : ""
        })
    } else {
        return res.redirect('/');
    }
};

module.exports.processLoginPage = (req,res, next) => {
    passport.authenticate("local", (err, account, info) => {
        //server error?
        if(err){
            return next(err);
        }
        // is there a account login error?
        if(!account){
            req.flash("loginMessage", "Authentication Error");
            return res.redirect("/login");
        }
        req.login(account, (err) => {
            //server error?
            if(err){
                console.log("im here");
                return next(err);
            }
            return res.redirect("/contact-list");
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
            userName: req.account ? req.account.username : ""
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
            console.log(err.name);
            if(err.name == "UserExistsError"){
                req.flash(
                    "registerMessage",
                    "Registration Error: Account Already Exists!"
                );
                console.log("Error: Account Already Exists!");
            }
            return res.render("pages/register",
            {
                title: "Register",
                messages: req.flash("registerMessage"),
                userName: req.account ? req.account.username : ""
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
    res.redirect("/");
}