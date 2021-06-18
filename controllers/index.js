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
        // is there a user login error?
        if(!user){
            req.flash("loginMessage", "Authentication Error");
            return res.redirect("pages/login");
        }
        req.login(account, (err) => {
            //server error?
            if(err){
                return next(err);
            }
            return res.redirect("/");
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.account){
        res.render("pages/register",
        {
            title: "Register",
            messages: req.flash("registerMessage", "Register an Account."),
            userName: req.account ? req.account.username : ""
        });
    }
    else{
        return res.redirect("/");
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newAccount = new Account({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email

    });

    Account.register(newAccount, req.body.password, (err, account) => {
        if(err){
            console.log("Error: Inserting New User");
            if(err.name == "AccountExistsError"){
                req.flash(
                    "registerMessage",
                    "Registration Error: User Already Exists!"
                );
                console.log("Error: User Already Exists!");
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
            // redirect the user and authenticate them

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