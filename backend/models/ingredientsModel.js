const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var ingredientsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,

    },
    categoryId:
        {
            type: mongoose.Schema.ObjectId,
            ref: "Category",
          },


    unitId:
        {
            type: mongoose.Schema.ObjectId,
            ref: "Ingredientunit",
          },

    purchaseprice:{
        type:String,

    },
    alertquantity:{
        type:String,

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
module.exports = mongoose.model('Ingredient', ingredientsSchema);