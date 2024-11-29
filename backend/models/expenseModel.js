const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var expenseSchema = new mongoose.Schema({
    expensename:{
        type:String,
        required:true,

    },

    addedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      status: {
        type: Number,
        default: 0, // Set the default value of status to 0
    },

});

//Export the model
module.exports = mongoose.model('Expense', expenseSchema);