const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var ingredientunitSchema = new mongoose.Schema({
    unitname:{
        type:String,
        required:true,
        unique:true,

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
module.exports = mongoose.model('Ingredientunit', ingredientunitSchema);