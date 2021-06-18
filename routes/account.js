<<<<<<< HEAD
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Account Model
let Account = require('../models/account');

/* GET Route for Account List page - READ Operation */
router.get('/', (req, res, next) => {
    Account.find((err, AccountList) => {
        if(err){
            return console.error(err);
        }
        else{
            console.log(AccountList);
        }
    });
});

module.exports = router;
=======
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Account Model
let Account = require('../models/account');

/* GET Route for Account List page - READ Operation */
router.get('/', (req, res, next) => {
    Account.find((err, AccountList) => {
        if(err){
            return console.error(err);
        }
        else{
            console.log(AccountList);
        }
    });
});
>>>>>>> 67d2dbad5739f6658fbf433a76a38630af7acead
