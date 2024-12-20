const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var customerSchema = new mongoose.Schema({
    customername:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    customeremail:{
        type:String,

        unique:true,
    },
    customermobile:{
        type:String,
        required:true,
        unique:true,
    },
    customeraddress:{
        type:String,
        required:true,
    },
    status: {
        type: Number,
        default: 0, // Set the default value of status to 0
    },

});

//Export the model
module.exports = mongoose.model('Customer', customerSchema);