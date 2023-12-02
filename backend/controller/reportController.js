const asyncHandler =require('express-async-handler');
const Pos =require('../models/posModels');
const Delivery =require('../models/deliveryModel');
const Customer =require('../models/customerModel');
const Waiter =require('../models/waiterModel');

const deliveryReports =asyncHandler(async(req,res) =>{

    try {
        const orders = await Pos.aggregate([
          {
            $lookup: {
              from: 'deliveries', 
              localField: 'delivery', 
              foreignField: '_id',
              as: 'deliveryInfo'
            }
          },
          {
            $match: {
              'deliveryInfo': { $ne: [] } 
            }
          }
        ]);
    
        res.json(orders);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

const deliveryPerson =asyncHandler(async(req,res) =>
{
    try {
        const getDelivery = await Delivery.find();
        res.json(getDelivery);
      } catch (error) {
        throw new Error(error);
      }
    
})

const customerReports =asyncHandler(async(req,res) =>{
    try {
        const customerorders = await Pos.aggregate([
          {
            $lookup: {
              from: 'customers', 
              localField: 'customers', 
              foreignField: '_id',
              as: 'customerInfo'
            }
          },
          {
            $match: {
              'customerInfo': { $ne: [] } 
            }
          }
        ]);
    
        res.json(customerorders);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

const getCustomer =asyncHandler(async(req,res) =>{
    try {
        const getCustomer = await Customer.find();
        res.json(getCustomer);
      } catch (error) {
        throw new Error(error);
      }
});


const waiterReport =asyncHandler(async(req,res) =>{
    try {
        const waiterorders = await Pos.aggregate([
          {
            $lookup: {
              from: 'waiters', 
              localField: 'waiterId', 
              foreignField: '_id',
              as: 'waiterInfo'
            }
          },
          {
            $match: {
              'waiterInfo': { $ne: [] } 
            }
          }
        ]);
    
        res.json(waiterorders);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

const getWaiter =asyncHandler(async(req,res) =>{
    try {
        const getWaiter = await Waiter.find();
        res.json(getWaiter);
      } catch (error) {
        throw new Error(error);
      }
});



module.exports ={deliveryReports,
    deliveryPerson,
    customerReports,
    getCustomer,
    waiterReport,
    getWaiter
};