let mongoose = require('mongoose');

// create a model class

let accountModel = mongoose.Schema({
    username: String,
 	password: String,
 	email: String
},
{
    collection: "accounts"
});

module.exports = mongoose.model('Account', accountModel);