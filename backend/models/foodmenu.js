const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const foodmenuSchema = new mongoose.Schema({
    foodmenuname:{
        type:String,
        required:true,
        unique:true,
        index:true,
        default: "",


    },
    foodcategoryId:{

            type:String,
            ref: "Foodcategory",


    },

foodingredientId: [{type:String,}],

    salesprice:{
        type:String,

    },
    vatId:{
        type: String,
        ref: "Vat",
    },
    description:
    {
        type:String,

    },
    vegitem:{
        type:String,
    },
    status: {
        type: Number,
        default: 0, // Set the default value of status to 0
    },




});


//Export the model


const Foodmenu = mongoose.model('Foodmenu', foodmenuSchema);

module.exports = Foodmenu;