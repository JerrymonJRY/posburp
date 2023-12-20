const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var openningBalanceSchema = new mongoose.Schema({
    openningbalancenumber: { type: String },
    amount: {
        type: String,
        required: true,
     
        collation: { locale: 'en', strength: 2 },
    },
    date: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model('Openningbalance', openningBalanceSchema);
