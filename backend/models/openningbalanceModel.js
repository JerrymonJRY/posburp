const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var openningBalanceSchema = new mongoose.Schema({
    
    date: { type: Date, default: Date.now },
    amount: {
        type: Number,
       
       
    },
});

// Create a unique index on the "amount" field


// Export the model
module.exports = mongoose.model('Openningbalance', openningBalanceSchema);