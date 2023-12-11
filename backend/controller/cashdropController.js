const asyncHandler =require('express-async-handler');
const Cashdrop =require('../models/cashdropModel');


const createCash =asyncHandler(async(req,res) =>{

    const {amount,dropout,notes} = req.body;
  // console.log(req.body);
  try
  {
    const cashdropout = new Cashdrop({
        amount:amount,
        dropout:dropout,
        notes:notes,
       
      
    });

    const finaldata = await cashdropout.save();

    res.json(finaldata);
  }
  catch (error) {
    res.status(401).json({status:401,error})
}
})

module.exports ={createCash}