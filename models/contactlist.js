let mongoose = require('mongoose');

// create a model class

let contactModel = mongoose.Schema({
    name: String,
    number: Int32Array,
    email: String
},
{
    collection: "contacts"
});


module.exports = mongoose.model('Contact', contactModel);