let mongoose = require('mongoose');

// create a model class

let contactModel = mongoose.Schema({
    contactName:{
        type: String,
        default: "",
        trim: true,
        required: "Contact Name is required"
    },
 	contactNumber:{
        type: Int32Array,
        default: "",
        trim: true,
        required: "Contact Number is required"
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
    collection: "contacts"
});


module.exports = mongoose.model('Contact', contactModel);