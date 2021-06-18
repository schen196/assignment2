let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

// create a model class

let Account = mongoose.Schema({
    username:{
        type: String,
        default: "",
        trim: true,
        required: "username is required"
    },
 	password:{
        type: String,
        default: "",
        trim: true,
        required: "passpord is required"
     },
 	email:{
        type: String,
        default: '',
        trim: true,
        required: "Email address is required."
     },
     created:{
         type: Date,
         default: Date.now
     },
     update:{
         type: Date,
         default: Date.now
     }
},
{
    collection: "accounts"
});

// configure options for account model

let options = ({missingPasswordError: 'Wrong / Missing Password'});

Account.plugin(passportLocalMongoose, options);

module.exports.Account = mongoose.model('Account', Account);