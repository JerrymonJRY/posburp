const asyncHandler =require('express-async-handler');
const Balance =require('../models/openningbalanceModel')


const createBalance =asyncHandler(async(req,res) =>{

   // const today = new Date().toISOString().split('T')[0];
    const { amount } =req.body.amount;
  try {
    const result =  Balance.create(req.body);

    res.json(result);
  } catch (error) {
    console.error('Error completing opening balance:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

const checkBalance = asyncHandler(async (req, res) => {
    const today = new Date().toISOString().split('T')[0];
  
    try {
      const result = await Balance.findOne({
        date: { $gte: new Date(today), $lt: new Date(today + 'T23:59:59.999Z') },
      });
  
      if (result) {
        res.json({ hasOpeningBalance: true, openingBalance: result });
      } else {
        res.json({ hasOpeningBalance: false });
      }
    } catch (error) {
      console.error('Error checking opening balance:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports={createBalance,checkBalance}