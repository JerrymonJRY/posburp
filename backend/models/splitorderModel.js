const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var splitorderSchema = new mongoose.Schema({
    splitnumber:{type:String},
    orderId:{
        type: mongoose.Schema.ObjectId,
           ref: "Pos",
        
       },
    cart:[{
        foodmenuId: { type: mongoose.Schema.ObjectId,
          ref: "FoodMenu",},
        foodmenuname:String,
        salesprice: String,
        quantity: String,
    
      }],
      addedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      shiftstoken:{
        type: String,
        
    },
    opentoken:{type:String},
    
        date: { type: Date, default: Date.now },
        status:{
          type: String,
          default: null,
        },
});

//Export the model
module.exports = mongoose.model('Splitorder', splitorderSchema);