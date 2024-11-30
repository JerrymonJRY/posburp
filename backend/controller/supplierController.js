const asyncHandler =require('express-async-handler');
const Supplier = require('../models/supplierModel');

const createSupplier =asyncHandler(async(req,res) =>{

    const suppliername =req.body.suppliername;
    const suppliermobile =req.body.suppliermobile;
    const taxnumber =req.body.taxtnumber;
    const findSupplier =await Supplier.findOne({
        suppliername:suppliername,
        suppliermobile:suppliermobile,
        taxnumber:taxnumber });
    if(!findSupplier)
    {
        //Create a new User
        const newTable =Supplier.create(req.body);
        res.json(newTable);
    }
    else{

        throw new Error("Supplier Details Already Exist");

    }

});

const viewSupplier =asyncHandler(async(req,res) =>
{
    try {
        const getSupplier = await Supplier.find();
        res.json(getSupplier);
      } catch (error) {
        throw new Error(error);
      }
});


const updateSupplier =asyncHandler(async(req,res) =>{

    const { id } =req.params;
    try
    {
        const updateSupplier =await Supplier.findByIdAndUpdate(id,{
            suppliername:req?.body?.suppliername,
            suppliermobile:req?.body?.suppliermobile,
            taxnumber:req?.body?.taxnumber,
            supplieremail:req?.body?.supplieremail,
            licensenumber:req?.body?.licensenumber,
            supplieraddress:req?.body?.supplieraddress



          },
          {
              new:true,
          }
          );

          res.json(updateSupplier);
    }catch(error)
    {
        throw new Error(error);
    }

});


const getSupplier =asyncHandler(async(req,res) =>{

    const { id } =req.params;

   //console.log(id);
   try
   {
        const getsupplier =await Supplier.findById(id);
        res.json(getsupplier);

   }catch(error)
   {
    throw new Error(error);
   }

  });


  const updateSupplierStatus = async (req, res) => {
    try {
      // Update all documents that do not have a status field
      const result = await Supplier.updateMany(
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

module.exports ={
    createSupplier,
    viewSupplier,
    updateSupplier,
    getSupplier,
    updateSupplierStatus
};