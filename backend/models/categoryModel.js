const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema({
    categoryname:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    description:{
        type:String,


    },
    status: {
        type: Number,
        default: 0, // Set the default value of status to 0
    },

});

//Export the model
module.exports = mongoose.model('Category', categorySchema);