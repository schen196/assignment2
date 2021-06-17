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