const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var openningBalanceSchema = new mongoose.Schema({
    amount:{
        type:Boolean,
        required:true,
        unique:true,
        index:true,
    },
    date: { type: Date, default: Date.now },
  
});

//Export the model
module.exports = mongoose.model('Openningbalance', openningBalanceSchema);