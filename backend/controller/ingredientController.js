const asyncHandler =require('express-async-handler');
const Ingredients =require('../models/ingredientsModel');
const Category =require('../models/categoryModel');
const IngredientUnit =require('../models/ingredientunitModel');



const createIngredient =asyncHandler(async (req,res) =>{
    const name =req.body.name;
    const findIngredientunit =await Ingredients.findOne({ name:name });
    if(!findIngredientunit)
    {
        //Create a new User
        const newIngunit =Ingredients.create(req.body);
        res.json(newIngunit);
    }
    else{

        throw new Error("Ingredient Unit Already Exist");

    }
});


const getCategory =asyncHandler(async (req,res) =>{
    try {
        const getcat = await Category.find();
        res.json(getcat);
      } catch (error) {
        throw new Error(error);
      }

});

const getingredientUnit =asyncHandler(async(req,res) =>{
    try {
        const geting = await IngredientUnit.find();
        res.json(geting);
      } catch (error) {
        throw new Error(error);
      }
});


const getalling =asyncHandler(async(req,res) =>{


  try {
    const ingredient = await Ingredients.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $lookup: {
          from: 'ingredientunits',
          localField: 'unitId',
          foreignField: '_id',
          as: 'ingredientunit',
        },
      },
      {
        $unwind: '$ingredientunit',
      },
    ]);

    res.json(ingredient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }

});

const getingredient =asyncHandler(async(req,res) =>{
  const { id } =req.params;

  //console.log(id);
  try
  {
       const getcat =await Ingredients.findById(id);
       res.json(getcat);

  }catch(error)
  {
   throw new Error(error);
  }
});

const updateingredient =asyncHandler(async(req,res)=>{

  const { id } =req.params;

  try
  {
      const updateUser =await Ingredients.findByIdAndUpdate(id,{
         name:req?.body?.name,
          categoryId:req?.body.categoryId,
           unitId:req?.body?.unitId,
          purchaseprice:req?.body?.purchaseprice,
          alertquantity:req?.body?.alertquantity,
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


const updateIngredientsStatus = async (req, res) => {
  try {
    // Update all documents that do not have a status field
    const result = await Ingredients.updateMany(
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


module.exports={ createIngredient,
  getCategory,
  getingredientUnit,
  getalling,
  getingredient,
  updateingredient,
  updateIngredientsStatus
};
