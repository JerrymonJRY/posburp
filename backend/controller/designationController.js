const asyncHandler =require('express-async-handler');
const Designation =require('../models/designationModel');

const User =require('../models/userModel');

const createDesignation =asyncHandler(async(req,res) =>{

    const {designationname,addedby} = req.body;

    try
    {
        const newEntry = new Designation({


            designationname: designationname,
            addedby: addedby,

          });

          const finaldata = await newEntry.save();

          res.json(finaldata);
    }
    catch (error) {
        res.status(401).json({status:401,error})
    }
});


const getDesignation =asyncHandler(async(req,res) =>{

    try {
        const designation = await Designation.find().populate('addedby', 'firstname lastname');

        if (!designation || designation.length === 0) {
          return res.status(404).json({ error: 'No designation found' });
        }

        // Map expenses to include the user's full name
        // const expensesWithFullName = expenses.map((expense) => ({
        //   _id: expense._id,
        //   expensename: expense.expensename,
        //   addedby: expense.addedby,
        //   fullName: expense.addedby.firstname + ' ' + expense.addedby.lastname,
        // }));

        res.json(designation);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }

});


const editDesignation =asyncHandler(async(req,res) =>{

  const { id } =req.params;

 //console.log(id);
 try
 {
      const getcat =await Designation.findById(id);
      res.json(getcat);

 }catch(error)
 {
  throw new Error(error);
 }

});


const updateDesignation =asyncHandler(async(req,res)=>{

  const { id } =req.params;

  try
  {
      const updateExpense =await Designation.findByIdAndUpdate(id,{
          designationname:req?.body?.designationname,
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

const deleteDesignation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);

  try {
    const deleteExpense = await Designation.findByIdAndDelete(id);
    res.json({
      deleteExpense,
    });
  } catch (error) {
    throw new Error(error);
  }
});


const updateDeignationStatus = async (req, res) => {
  try {
    // Update all documents that do not have a status field
    const result = await Designation.updateMany(
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



module.exports ={createDesignation,
  getDesignation,
  editDesignation,
  updateDesignation,
  deleteDesignation,
  updateDeignationStatus
}