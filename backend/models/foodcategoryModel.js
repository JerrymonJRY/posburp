const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var foodcategorySchema = new mongoose.Schema({
    foodcategoryname:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    description:{
        type:String,
        required:true,

    },
    status: {
        type: Number,
        default: 0, // Set the default value of status to 0
    },

});

//Export the model
module.exports = mongoose.model('Foodcategory', foodcategorySchema);