const asyncHandler =require('express-async-handler');
const Ingredientunit =require('../models/ingredientunitModel');

const createIngunit =asyncHandler(async(req,res) =>{

    const unitname =req.body.unitname;
    const findIngredientunit =await Ingredientunit.findOne({ unitname:unitname });
    if(!findIngredientunit)
    {
        //Create a new User
        const newIngunit =Ingredientunit.create(req.body);
        res.json(newIngunit);
    }
    else{

        throw new Error("Ingredient Unit Already Exist");

    }
});



const getallIngunit = asyncHandler(async (req, res) => {
    try {
      const getIngredientunit = await Ingredientunit.find();
      res.json(getIngredientunit);
    } catch (error) {
      throw new Error(error);
    }
  });


  const getingunit =asyncHandler(async(req,res) =>{

    const { id } =req.params;

   //console.log(id);
   try
   {
        const getcat =await Ingredientunit.findById(id);
        res.json(getcat);

   }catch(error)
   {
    throw new Error(error);
   }

  });

  const updateingUnit =asyncHandler(async(req,res)=>{

    const { id } =req.params;

    try
    {
        const updateUser =await Ingredientunit.findByIdAndUpdate(id,{
          unitname:req?.body?.unitname,
            description:req?.body?.description,


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


  const deleteIngUnit = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // validateMongoDbId(id);

    try {
      const deleteCategory = await Ingredientunit.findByIdAndDelete(id);
      res.json({
        deleteCategory,
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  const updateingredientUnitStatus = async (req, res) => {
    try {
      // Update all documents that do not have a status field
      const result = await Ingredientunit.updateMany(
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


module.exports={ createIngunit,
  getallIngunit,
  getingunit,
  updateingUnit,
  deleteIngUnit,
  updateingredientUnitStatus
 };