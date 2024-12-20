const asyncHandler =require('express-async-handler');
const mongoose = require('mongoose');
const Pos =require('../models/posModels');
const Delivery =require('../models/deliveryModel');
const Customer =require('../models/customerModel');
const Waiter =require('../models/waiterModel');
const User =require('../models/userModel');

const deliveryReports =asyncHandler(async(req,res) =>{

    try {
      const { startDateFilter, endDateFilter, delivery } = req.query;
      const matchCriteria = {}; // Initialize matchCriteria

      if (startDateFilter && endDateFilter) {
        matchCriteria.date = {
          $gte: new Date(startDateFilter),
          $lt: new Date(new Date(endDateFilter).setHours(23, 59, 59, 999)),
        };
      }
      if (delivery) {
        //matchCriteria.deliveryId = deliveryId;
        matchCriteria.delivery = new mongoose.Types.ObjectId(delivery);
      }
        const orders = await Pos.aggregate([
          {
            $match: matchCriteria,
          },
          {
            $lookup: {
              from: 'users', 
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
       // const getDelivery = await Delivery.find();
       const getDelivery = await User.find({ userrole: "Delivery" });
        res.json(getDelivery);
      } catch (error) {
        throw new Error(error);
      }
    
})

const customerReports =asyncHandler(async(req,res) =>{
    try {

      const { startDateFilter, endDateFilter, customers } = req.query;
      const matchCriteria = {}; // Initialize matchCriteria

      if (startDateFilter && endDateFilter) {
        matchCriteria.date = {
          $gte: new Date(startDateFilter),
          $lt: new Date(new Date(endDateFilter).setHours(23, 59, 59, 999)),
        };
      }
      if (customers) {
        // matchCriteria.customerId = customerId;
        matchCriteria.customers = new mongoose.Types.ObjectId(customers);
      }
  
        const customerorders = await Pos.aggregate([
          {
            $match: matchCriteria,
          },
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

const waiterReport = asyncHandler(async (req, res) => {
  try {
    const { startDateFilter, endDateFilter, waiterId } = req.query;

    const matchCriteria = {};

    if (startDateFilter && endDateFilter) {
      matchCriteria.date = {
        $gte: new Date(startDateFilter),
        $lt: new Date(new Date(endDateFilter).setHours(23, 59, 59, 999)),
      };
    }

    if (waiterId) {
      matchCriteria.waiterId = new mongoose.Types.ObjectId(waiterId);
    }

    const waiterorders = await Pos.aggregate([
      {
        $match: matchCriteria,
      },
      {
        $lookup: {
          from: 'users',
          localField: 'waiterId',
          foreignField: '_id',
          as: 'waiterInfo',
        },
      },
      {
        $match: {
          'waiterInfo': { $ne: [] },
        },
      },
    ]);

    res.json(waiterorders);
    console.log(waiterorders);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



const getWaiter =asyncHandler(async(req,res) =>{
    try {
      const getWaiter = await User.find({ userrole: "Waiter" });
        res.json(getWaiter);
      } catch (error) {
        throw new Error(error);
      }
});



module.exports ={
    deliveryReports,
    deliveryPerson,
    customerReports,
    getCustomer,
    waiterReport,
    getWaiter
};