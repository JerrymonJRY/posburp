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

module.exports={ createIngredient,getCategory,getingredientUnit,getalling };
