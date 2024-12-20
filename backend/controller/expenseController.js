const asyncHandler =require('express-async-handler');
const Expense =require('../models/expenseModel');
const User =require('../models/userModel');

const createExpense =asyncHandler(async(req,res) =>{

    const {expensename,addedby} = req.body;

    try
    {
        const newEntry = new Expense({


            expensename: expensename,
            addedby: addedby,

          });

          const finaldata = await newEntry.save();

          res.json(finaldata);
    }
    catch (error) {
        res.status(401).json({status:401,error})
    }
});


const getExpense =asyncHandler(async(req,res) =>{

    try {
        const expenses = await Expense.find().populate('addedby', 'firstname lastname');

        if (!expenses || expenses.length === 0) {
          return res.status(404).json({ error: 'No expenses found' });
        }

        // Map expenses to include the user's full name
        // const expensesWithFullName = expenses.map((expense) => ({
        //   _id: expense._id,
        //   expensename: expense.expensename,
        //   addedby: expense.addedby,
        //   fullName: expense.addedby.firstname + ' ' + expense.addedby.lastname,
        // }));

        res.json(expenses);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }

});


const editExpense =asyncHandler(async(req,res) =>{

  const { id } =req.params;

 //console.log(id);
 try
 {
      const getcat =await Expense.findById(id);
      res.json(getcat);

 }catch(error)
 {
  throw new Error(error);
 }

});


const updateExpense =asyncHandler(async(req,res)=>{

  const { id } =req.params;

  try
  {
      const updateExpense =await Expense.findByIdAndUpdate(id,{
          expensename:req?.body?.expensename,
          addedby:req?.body?.addedby,


      },
      {
          new:true,
      }
      );

      res.json(updateExpense);
  }
  catch(error)
  {
      throw new Error(error);
  }


});

const deleteExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);

  try {
    const deleteExpense = await Expense.findByIdAndDelete(id);
    res.json({
      deleteExpense,
    });
  } catch (error) {
    throw new Error(error);
  }
});


const updateExpenseStatus = async (req, res) => {
  try {
    // Update all documents that do not have a status field
    const result = await Expense.updateMany(
      { status: { $exists: false } }, // Check if the status field does not exist
      { $set: { status: 0 } }         // Set the default value 0 for status
    );

    // If no documents were updated
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "No documents were updated." });
    }

    res.status(200).json({ message: "All documents updated successfully!" });
  } catch (err) {
    console.error("Error updating documents:", err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};





module.exports ={createExpense,
  getExpense,
  editExpense,
  updateExpense,
  deleteExpense,
  updateExpenseStatus
}