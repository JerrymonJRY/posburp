const asyncHandler =require('express-async-handler');
const Vat =require('../models/vatModel');

const createVat =asyncHandler(async(req,res) =>{

    const vatname =req.body.vatname;
    const findVat =await Vat.findOne({ vatname:vatname });
    if(!findVat)
    {
        //Create a new User
        const newVat =Vat.create(req.body);
        res.json(newVat);
    }
    else{

        throw new Error("Category Already Exist");

    }

});

const getallVat = asyncHandler(async (req, res) => {
    try {
      const getVat = await Vat.find();
      res.json(getVat);
    } catch (error) {
      throw new Error(error);
    }
  });


  const getVat =asyncHandler(async(req,res) =>{

    const { id } =req.params;

   //console.log(id);
   try
   {
        const getcat =await Vat.findById(id);
        res.json(getcat);

   }catch(error)
   {
    throw new Error(error);
   }

  });

  const updateVat =asyncHandler(async(req,res)=>{

    const { id } =req.params;

    try
    {
        const updateUser =await Vat.findByIdAndUpdate(id,{
          vatname:req?.body?.vatname,
          percentage:req?.body?.percentage,


        },
        {
            new:true,
        }
        );

        res.json(updateUser);
    }
    catch(error)
    {
        throw new Error(error);
    }


  });


  const deleteVat = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // validateMongoDbId(id);

    try {
      const deleteCategory = await Vat.findByIdAndDelete(id);
      res.json({
        deleteCategory,
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  const updateVatStatus = async (req, res) => {
    try {
      // Update all documents that do not have a status field
      const result = await Vat.updateMany(
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



module.exports = {
  createVat,
  getallVat,
  getVat,
  updateVat,
  deleteVat,
  updateVatStatus

};