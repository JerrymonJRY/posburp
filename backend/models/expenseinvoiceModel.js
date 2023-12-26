const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var expenseinvoiceSchema = new mongoose.Schema({
    amount:{
        type:String,
        required:true,
       
    },
    dropout:{
        type:String,
       
       
    },
    notes:{
        type:String,
       
       
    },
    date: { type: Date, default: Date.now },
 
});

//Export the model
module.exports = mongoose.model('ExpenseInvoice', expenseinvoiceSchema);