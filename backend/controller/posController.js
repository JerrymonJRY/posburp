const asyncHandler =require('express-async-handler');
const mongoose = require('mongoose');
const foodcategory =require('../models/foodcategoryModel');
const Waiter =require('../models/waiterModel');
const Table =require('../models/tableModel');
const Customer =require('../models/customerModel');
const Foodmenu =require('../models/foodmenuModel');
const Pos  =require('../models/posModels');
const Delivery =require('../models/deliveryModel');
const OrderTable =require('../models/ordertableModel');


//Food Category
const getposCategory =asyncHandler(async (req,res) =>{
    try {
        const getfoodcat = await foodcategory.find();
        res.json(getfoodcat);
      } catch (error) {
        throw new Error(error);
      }

});

//Waiter Modal
const getPosWaiter =asyncHandler(async (req,res) =>{
  try {
      const getWaiter = await Waiter.find();
      res.json(getWaiter);
    } catch (error) {
      throw new Error(error);
    }

});
//Customer Model
const getCustomer =asyncHandler(async (req,res) =>{
  try {
      const getCustomer = await Customer.find();
      res.json(getCustomer);
    } catch (error) {
      throw new Error(error);
    }

});
//Table Model
const getTable =asyncHandler(async (req,res) =>{
  try {
      const getTable = await Table.find();
      res.json(getTable);
    } catch (error) {
      throw new Error(error);
    }

});


const getDelivery =asyncHandler(async(req,res) =>{
  try {
    const getDelivery = await Delivery.find();
    res.json(getDelivery);
  } catch (error) {
    throw new Error(error);
  }


})

const getposFooditems =asyncHandler(async (req,res) =>{
  try {
    const posfoodmenu = await Foodmenu.aggregate([
      {
        $lookup: {
          from: 'foodcategories',
          localField: 'foodcategoryId',
          foreignField: '_id',
          as: 'foodcategory',
        },
      },
      {
        $unwind: '$foodcategory',
      },
      {
        $lookup: {
          from: 'vats',
          localField: 'vatId',
          foreignField: '_id',
          as: 'vat',
        },
      },
      {
        $unwind: '$vat',
      },
      
    ]);
  
    res.json(posfoodmenu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }

});


const insertPos =asyncHandler(async(req,res) =>{
  try {
    const  {customers,options,grandTotal,cart,vatAmount,total,foodoption,waiterId,tableId,delivery,numberofperson}  = req.body;
  console.log(req.body);

 const sequence = await Pos.findOne({}).sort('-ordernumber'); // Find the latest ID

    let nextIdNumber = 'Burp01001023001';

    if (sequence && sequence.ordernumber) {
      // Extract and increment the numeric part of the latest ID
      const lastIdNumber = sequence.ordernumber;
      const numericPart = lastIdNumber.substring(11); // Extract the numeric part
      const nextNumericValue = parseInt(numericPart, 10) + 1;
      nextIdNumber = `Burp0100102${nextNumericValue.toString().padStart(3, '0')}`;
    }

    // Check if the ID number already exists
    const exists = await Pos.findOne({ ordernumber: nextIdNumber });

    if (exists) {
      return res.status(400).json({ error: 'ID number already exists' });
    }
    let paymentstatus ="notpaid";

    const newEntry = new Pos({ 
      ordernumber: nextIdNumber,
      customers:customers,
      options:foodoption,
      cart:cart,
      total:total,
      grandTotal:grandTotal,
      vatAmount:vatAmount,
      waiterId:waiterId,
      tableId:tableId,
      paymentstatus:paymentstatus,
      delivery:delivery,
});
   
    const finaldata = await newEntry.save();

    if (tableId !== null && tableId !== undefined && tableId !== '') {

      let orderstatus ="Pending";
      const Tableorder = new OrderTable({ 
        orderId:finaldata._id,
        ordertableId:tableId,
        numberofperson:numberofperson,
        orderstatus:orderstatus
       
      });
      await Tableorder.save();

    }
  



 

  

    res.json(finaldata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while inserting data' });
  }
})


const getAllPos =asyncHandler(async(req,res) =>{
  try {
    // const getAllPos = await Pos.find();
    // res.json(getAllPos);
    const pos = await Pos.aggregate([
      {
        $unwind: "$cart" // Flatten the cart array
      },
      {
        $lookup: {
          from: "foodmenus",
          localField: "cart.foodmenuId",
          foreignField: "_id",
          as: "menuItemDetails"
        }
      },
      {
        $unwind: "$menuItemDetails" // Unwind the menuItemDetails array
      },

      {
        $lookup: {
          from: "customers",
          localField: "customers",
          foreignField: "_id",
          as: "customerDetails"
        }
      },
      {
        $unwind: {
          path: "$customerDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        }
      },
      {
        $lookup: {
          from: "waiters",
          localField: "waiterId",
          foreignField: "_id",
          as: "waiterDetails"
        }
      },
      {
        $unwind: "$waiterDetails"
      },
      {
        $lookup: {
          from: "tables",
          localField: "tableId",
          foreignField: "_id",
          as: "tableDetails"
        }
      },
      {
        // $unwind: "$tableDetails"
        $unwind: {
          path: "$tableDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        }
      },
      {
        $lookup: {
          from: "delivery",
          localField: "delivery",
          foreignField: "_id",
          as: "deliveryDetails"
        }
      },
      {
        $unwind: {
          path: "$deliveryDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        }
      },
      {
        $group: {
          _id: "$_id",
          ordernumber:{$first: "$ordernumber"},
          options: { $first: "$options" },
          total: { $first: "$total" },
          grandTotal: { $first: "$grandTotal" },
          vatAmount: { $first: "$vatAmount" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          cart: {
            $push: {
              foodmenuId: "$cart.foodmenuId",
              salesprice: "$cart.salesprice",
              quantity: "$cart.quantity",
              menuItemDetails: "$menuItemDetails"
            }
          },
          customerDetails: { $first: "$customerDetails" },

          waiterDetails: { $first: "$waiterDetails" },

          deliveryDetails:{
            $first:"$deliveryDetails"
          },

        }
      }
      
    ]);
  
    res.json(pos);
  } catch (error) {
    throw new Error(error);
  }
});

const runningOrder =asyncHandler(async(req,res) =>{

  try {
    const runningorder = await Pos.aggregate([
      {
        $match: {
          paymentstatus: "notpaid"
        }
      },

      {
        $lookup: {
          from: 'tables',
          localField: 'tableId',
          foreignField: '_id',
          as: 'table',
        },
      },
      {
        //$unwind: '$table',
        $unwind: {
          path: "$table",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        }
      },
      {
        $lookup: {
          from: 'waiters',
          localField: 'waiterId',
          foreignField: '_id',
          as: 'waiter',
        },
      },
      {
        $unwind: '$waiter',
      },
      

    ]);
    res.json(runningorder);
    // Use Mongoose to find orders where paymentstatus is "notpaid"
   // const notPaidOrders = await Pos.find({ paymentstatus: 'notpaid' });

   // res.json(notPaidOrders);
  } catch (error) {
    console.error('Error fetching "notpaid" orders:', error);
  
  }

})

const completePaymeny =asyncHandler(async(req,res) =>{
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }
    const pos = await Pos.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id), // Match documents with the specified _id
        },
      },
      {
        $unwind: "$cart" // Flatten the cart array
      },
      {
        $lookup: {
          from: "foodmenus",
          localField: "cart.foodmenuId",
          foreignField: "_id",
          as: "menuItemDetails"
        },
      },
      {
        $unwind: "$menuItemDetails" // Unwind the menuItemDetails array
      },
      {
        $lookup: {
          from: "customers",
          localField: "customers",
          foreignField: "_id",
          as: "customerDetails"
        },
      },
      {
        $unwind: {
          path: "$customerDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        },
      },
      {
        $lookup: {
          from: "waiters",
          localField: "waiterId",
          foreignField: "_id",
          as: "waiterDetails"
        },
      },
      {
        $unwind: "$waiterDetails"
      },
      {
        $lookup: {
          from: "tables",
          localField: "tableId",
          foreignField: "_id",
          as: "tableDetails"
        },
      },
      {
        // $unwind: "$tableDetails"
        $unwind: {
          path: "$tableDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        },
      },
      {
        $lookup: {
          from: "delivery",
          localField: "delivery",
          foreignField: "_id",
          as: "deliveryDetails"
        }
      },
      {
        $unwind: {
          path: "$deliveryDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        }
      },
      {
        $group: {
          _id: "$_id",
          ordernumber: { $first: "$ordernumber" },
          options: { $first: "$options" },
          total: { $first: "$total" },
          grandTotal: { $first: "$grandTotal" },
          vatAmount: { $first: "$vatAmount" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          cart: {
            $push: {
              foodmenuId: "$cart.foodmenuId",
              salesprice: "$cart.salesprice",
              quantity: "$cart.quantity",
              menuItemDetails: "$menuItemDetails"
            }
          },
          customerDetails: { $first: "$customerDetails" },
  
          waiterDetails: { $first: "$waiterDetails" },

          deliveryDetails:{ $first :"$deliveryDetails" }
        }
      },
    ]);
  
    res.json(pos);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
  
 

});


const updatePayment =asyncHandler(async(req,res) =>
{
  try {
    // Assuming you have a model named "Pos"
    const { id } = req.params; // Get the document ID from the request parameters
    const { paymentType } = req.body; // Get updated data from the request body
      let paymentstatus ='paid';
    const updateResult = await Pos.updateOne(
      { _id: id }, // Match the document by its ID
      {
        $set: {
          paymentstatus:paymentstatus, // Update the "paymentstatus" field
          paymentType,  // Update the "paymentType" field
        },
      }
    );
  
    if (updateResult.nModified === 0) {
      // Check if any document was modified (nModified === 0 indicates no changes)
      return res.status(404).json({ error: 'No matching document found' });
    }
  
    // You can also retrieve the updated document if needed
    const updatedDocument = await Pos.findById(id);
  
    res.json(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});


const getKot =asyncHandler(async(req,res) =>
{
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }
    const pos = await Pos.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id), // Match documents with the specified _id
        },
      },
      {
        $unwind: "$cart" // Flatten the cart array
      },
      {
        $lookup: {
          from: "foodmenus",
          localField: "cart.foodmenuId",
          foreignField: "_id",
          as: "menuItemDetails"
        },
      },
      {
        $unwind: "$menuItemDetails" // Unwind the menuItemDetails array
      },
      {
        $lookup: {
          from: "customers",
          localField: "customers",
          foreignField: "_id",
          as: "customerDetails"
        },
      },
      {
        $unwind: {
          path: "$customerDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        },
      },
      {
        $lookup: {
          from: "waiters",
          localField: "waiterId",
          foreignField: "_id",
          as: "waiterDetails"
        },
      },
      {
        $unwind: "$waiterDetails"
      },
      {
        $lookup: {
          from: "tables",
          localField: "tableId",
          foreignField: "_id",
          as: "tableDetails"
        },
      },
      {
        // $unwind: "$tableDetails"
        $unwind: {
          path: "$tableDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        },
      },
      {
        $lookup: {
          from: "delivery",
          localField: "delivery",
          foreignField: "_id",
          as: "deliveryDetails"
        }
      },
      {
        $unwind: {
          path: "$deliveryDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        }
      },
      {
        $group: {
          _id: "$_id",
          ordernumber: { $first: "$ordernumber" },
          options: { $first: "$options" },
          total: { $first: "$total" },
          grandTotal: { $first: "$grandTotal" },
          vatAmount: { $first: "$vatAmount" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          cart: {
            $push: {
              foodmenuId: "$cart.foodmenuId",
              salesprice: "$cart.salesprice",
              quantity: "$cart.quantity",
              menuItemDetails: "$menuItemDetails"
            }
          },
          customerDetails: { $first: "$customerDetails" },
  
          waiterDetails: { $first: "$waiterDetails" },
          deliveryDetails :{ $first : "$deliveryDetails" }
        }
      },
    ]);
  
    res.json(pos);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }


});

const insertPoshold =asyncHandler(async(req,res) =>{
  try {
    const  {customers,options,grandTotal,cart,vatAmount,total,foodoption,waiterId,tableId,delivery}  = req.body;
  console.log(req.body);

 const sequence = await Pos.findOne({}).sort('-ordernumber'); // Find the latest ID

    let nextIdNumber = 'Burp01001023001';

    if (sequence && sequence.ordernumber) {
      // Extract and increment the numeric part of the latest ID
      const lastIdNumber = sequence.ordernumber;
      const numericPart = lastIdNumber.substring(11); // Extract the numeric part
      const nextNumericValue = parseInt(numericPart, 10) + 1;
      nextIdNumber = `Burp0100102${nextNumericValue.toString().padStart(3, '0')}`;
    }

    // Check if the ID number already exists
    const exists = await Pos.findOne({ ordernumber: nextIdNumber });

    if (exists) {
      return res.status(400).json({ error: 'ID number already exists' });
    }
    let hold ="hold";

    const newEntry = new Pos({ 
      ordernumber: nextIdNumber,
      customers:customers,
      options:foodoption,
      cart:cart,
      total:total,
      grandTotal:grandTotal,
      vatAmount:vatAmount,
      waiterId:waiterId,
      tableId:tableId,
      hold:hold,
      delivery:delivery,


     
    
    });
    await newEntry.save();

 

  

    res.json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while inserting data' });
  }
});

const getHold =asyncHandler(async(req,res) =>
{
  try {
    const holdingorder = await Pos.aggregate([
      {
        $match: {
          hold: "hold"
        }
      },

      {
        $lookup: {
          from: 'tables',
          localField: 'tableId',
          foreignField: '_id',
          as: 'table',
        },
      },
      {
        //$unwind: '$table',
        $unwind: {
          path: "$table",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        }
      },
      {
        $lookup: {
          from: 'waiters',
          localField: 'waiterId',
          foreignField: '_id',
          as: 'waiter',
        },
      },
      {
        $unwind: '$waiter',
      },
      

    ]);
    res.json(holdingorder);
    // Use Mongoose to find orders where paymentstatus is "notpaid"
   // const notPaidOrders = await Pos.find({ paymentstatus: 'notpaid' });

   // res.json(notPaidOrders);
  } catch (error) {
    console.error('Error fetching "notpaid" orders:', error);
  
  }
});


const todayOrder =asyncHandler(async(req,res) =>
{
  try {

    const today = new Date();
  today.setHours(0, 0, 0, 0);

    const todayorder = await Pos.aggregate([
      {
        $match: {
          paymentstatus: "paid",
          date: {
            $gte: today, // Greater than or equal to the beginning of the day
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // Less than the beginning of the next day
          }
        }
      },

      {
        $lookup: {
          from: 'tables',
          localField: 'tableId',
          foreignField: '_id',
          as: 'table',
        },
      },
      {
        //$unwind: '$table',
        $unwind: {
          path: "$table",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        }
      },
      {
        $lookup: {
          from: 'waiters',
          localField: 'waiterId',
          foreignField: '_id',
          as: 'waiter',
        },
      },
      {
        $unwind: '$waiter',
      },
      

    ]);
    res.json(todayorder);
   

   
  } catch (error) {
    console.error('Error fetching "notpaid" orders:', error);
  
  }

});

const insertQuickpay =asyncHandler(async(req,res) =>{

  try {
    const  {customers,options,grandTotal,cart,vatAmount,total,foodoption,waiterId,tableId,delivery}  = req.body;
  console.log(req.body);

 const sequence = await Pos.findOne({}).sort('-ordernumber'); // Find the latest ID

    let nextIdNumber = 'Burp01001023001';

    if (sequence && sequence.ordernumber) {
      // Extract and increment the numeric part of the latest ID
      const lastIdNumber = sequence.ordernumber;
      const numericPart = lastIdNumber.substring(11); // Extract the numeric part
      const nextNumericValue = parseInt(numericPart, 10) + 1;
      nextIdNumber = `Burp0100102${nextNumericValue.toString().padStart(3, '0')}`;
    }

    // Check if the ID number already exists
    const exists = await Pos.findOne({ ordernumber: nextIdNumber });

    if (exists) {
      return res.status(400).json({ error: 'ID number already exists' });
    }
    let paymentstatus ="paid";

    const newEntry = new Pos({ 
      ordernumber: nextIdNumber,
      customers:customers,
      options:foodoption,
      cart:cart,
      total:total,
      grandTotal:grandTotal,
      vatAmount:vatAmount,
      waiterId:waiterId,
      tableId:tableId,
      paymentstatus:paymentstatus,
      delivery:delivery,


     
    
    });
    await newEntry.save();

 

  

    res.json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while inserting data' });
  }

});


const getSplit =asyncHandler(async(req,res) =>
{
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }
    const pos = await Pos.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id), // Match documents with the specified _id
        },
      },
      {
        $unwind: "$cart" // Flatten the cart array
      },
      {
        $lookup: {
          from: "foodmenus",
          localField: "cart.foodmenuId",
          foreignField: "_id",
          as: "menuItemDetails"
        },
      },
      {
        $unwind: "$menuItemDetails" // Unwind the menuItemDetails array
      },
      {
        $lookup: {
          from: "customers",
          localField: "customers",
          foreignField: "_id",
          as: "customerDetails"
        },
      },
      {
        $unwind: {
          path: "$customerDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        },
      },
      {
        $lookup: {
          from: "waiters",
          localField: "waiterId",
          foreignField: "_id",
          as: "waiterDetails"
        },
      },
      {
        $unwind: "$waiterDetails"
      },
      {
        $lookup: {
          from: "tables",
          localField: "tableId",
          foreignField: "_id",
          as: "tableDetails"
        },
      },
      {
        // $unwind: "$tableDetails"
        $unwind: {
          path: "$tableDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        },
      },
      {
        $lookup: {
          from: "delivery",
          localField: "delivery",
          foreignField: "_id",
          as: "deliveryDetails"
        }
      },
      {
        $unwind: {
          path: "$deliveryDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        }
      },
      {
        $group: {
          _id: "$_id",
          ordernumber: { $first: "$ordernumber" },
          options: { $first: "$options" },
          total: { $first: "$total" },
          grandTotal: { $first: "$grandTotal" },
          vatAmount: { $first: "$vatAmount" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          cart: {
            $push: {
              foodmenuId: "$cart.foodmenuId",
              salesprice: "$cart.salesprice",
              quantity: "$cart.quantity",
              menuItemDetails: "$menuItemDetails"
            }
          },
          customerDetails: { $first: "$customerDetails" },
  
          waiterDetails: { $first: "$waiterDetails" },
          deliveryDetails :{ $first : "$deliveryDetails" }
        }
      },
    ]);
  
    res.json(pos);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }


});


const getMerge =asyncHandler(async(req,res) =>{
  const selectedIds = req.body.ids;

  console.log(selectedIds);

  try {
   
    const responseData = await Pos.find({ _id: { $in: selectedIds } });

    // Respond with the result
    res.json(responseData);
    console.log(responseData);
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const getedit =asyncHandler(async(req,res) =>{

  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }
    const pos = await Pos.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id), 
        },
      },
      {
        $unwind: "$cart" 
      },
      {
        $lookup: {
          from: "foodmenus",
          localField: "cart.foodmenuId",
          foreignField: "_id",
          as: "menuItemDetails"
        },
      },
      {
        $unwind: "$menuItemDetails" 
      },
      {
        $lookup: {
          from: "customers",
          localField: "customers",
          foreignField: "_id",
          as: "customerDetails"
        },
      },
      {
        $unwind: {
          path: "$customerDetails",
          preserveNullAndEmptyArrays: true 
        },
      },
      {
        $lookup: {
          from: "waiters",
          localField: "waiterId",
          foreignField: "_id",
          as: "waiterDetails"
        },
      },
      {
        $unwind: "$waiterDetails"
      },
      {
        $lookup: {
          from: "tables",
          localField: "tableId",
          foreignField: "_id",
          as: "tableDetails"
        },
      },
      {
        // $unwind: "$tableDetails"
        $unwind: {
          path: "$tableDetails",
          preserveNullAndEmptyArrays: true 
        },
      },
      {
        $lookup: {
          from: "delivery",
          localField: "delivery",
          foreignField: "_id",
          as: "deliveryDetails"
        }
      },
      {
        $unwind: {
          path: "$deliveryDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        }
      },
      {
        $group: {
          _id: "$_id",
          ordernumber: { $first: "$ordernumber" },
          options: { $first: "$options" },
          total: { $first: "$total" },
          grandTotal: { $first: "$grandTotal" },
          vatAmount: { $first: "$vatAmount" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          cart: {
            $push: {
              foodmenuId: "$cart.foodmenuId",
              salesprice: "$cart.salesprice",
              quantity: "$cart.quantity",
              menuItemDetails: "$menuItemDetails"
            }
          },
          customerDetails: { $first: "$customerDetails" },
  
          waiterDetails: { $first: "$waiterDetails" },
          deliveryDetails :{ $first : "$deliveryDetails" }
        }
      },
    ]);
  
    res.json(pos);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }



});



const tableorder = asyncHandler(async (req, res) => {

  try {
    const result = await Table.aggregate([
      {
        $lookup: {
          from: 'ordertables',
          localField: '_id',
          foreignField: 'ordertableId',
          as: 'orderData',
        },
      },
      {
        $unwind: {
          path: '$orderData',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          tablename: { $first: '$tablename' },
          Position: { $first: '$Position' },
          seatcapacity: { $first: '$seatcapacity' },
          description: { $first: '$description' },
          orderstatus: { $first: '$orderData.orderstatus' },
          subtractedValue: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    { $ne: ['$orderData', null] },
                    { $eq: ['$orderData.orderstatus', 'Pending'] },
                  ],
                },
                then: {
                  $cond: {
                    if: { $gte: [{ $toInt: '$seatcapacity' }, { $toInt: '$orderData.numberofperson' }] },
                    then: { $toInt: '$orderData.numberofperson' },
                    else: { $toInt: '$seatcapacity' },
                  },
                },
                else: 0,
              },
            },
          },
        },
      },
      {
        $project: {
          tablename: 1,
          Position: 1,
          seatcapacity: 1,
          description: 1,
          orderstatus: 1,
          subtractedValue: 1,
          availableSeat: { $subtract: [{ $toInt: '$seatcapacity' }, '$subtractedValue'] },
        },
      },
    ]);
  
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const calculateTable =asyncHandler(async(req,res) =>{
 

  // try {
  //   const result = await Table.aggregate([
  //     {
  //       $lookup: {
  //         from: 'ordertables',
  //         localField: '_id',
  //         foreignField: 'ordertableId',
  //         as: 'orderData',
  //       },
  //     },
  //     {
  //       $unwind: {
  //         path: '$orderData',
  //         preserveNullAndEmptyArrays: true,
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: '$_id',
  //         tablename: { $first: '$tablename' },
  //         Position: { $first: '$Position' },
  //         seatcapacity: { $first: '$seatcapacity' },
  //         description: { $first: '$description' },
  //         orderstatus: { $first: '$orderData.orderstatus' },
  //         subtractedValue: {
  //           $sum: {
  //             $cond: {
  //               if: {
  //                 $and: [
  //                   { $ne: ['$orderData', null] },
  //                   { $eq: ['$orderData.orderstatus', 'Pending'] },
  //                 ],
  //               },
  //               then: {
  //                 $cond: {
  //                   if: {
  //                     $gte: [
  //                       {
  //                         $subtract: [
  //                           { $convert: { input: '$seatcapacity', to: 'int' } },
  //                           { $convert: { input: '$orderData.numberofperson', to: 'int' } },
  //                         ],
  //                       },
  //                       0,
  //                     ],
  //                   },
  //                   then: {
  //                     $subtract: [
  //                       { $convert: { input: '$seatcapacity', to: 'int' } },
  //                       { $convert: { input: '$orderData.numberofperson', to: 'int' } },
  //                     ],
  //                   },
  //                   else: { $convert: { input: '$seatcapacity', to: 'int' } },
  //                 },
  //               },
  //               else: 0,
  //             },
  //           },
  //         },
  //       },
  //     },
  //     {
  //       $project: {
  //         tablename: 1,
  //         Position: 1,
  //         seatcapacity: 1,
  //         description: 1,
  //         orderstatus: 1,
  //         subtractedValue: 1,
  //         availableSeat: {
  //           $cond: {
  //             if: {
  //               $eq: [
  //                 {
  //                   $subtract: [
  //                     { $convert: { input: '$seatcapacity', to: 'int' } },
  //                     { $convert: { input: '$subtractedValue', to: 'int' } },
  //                   ],
  //                 },
  //                 { $convert: { input: '$seatcapacity', to: 'int' } },
  //               ],
  //             },
  //             then: { $convert: { input: '$seatcapacity', to: 'int' } },
  //             else: { $convert: { input: '$subtractedValue', to: 'int' } },
  //           },
  //         },
  //       },
  //     },
  //   ]);
  
  //   res.json(result);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
  
  
  try {
    const result = await Table.aggregate([
      {
        $lookup: {
          from: 'ordertables',
          localField: '_id',
          foreignField: 'ordertableId',
          as: 'orderData',
        },
      },
      {
        $unwind: {
          path: '$orderData',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          tablename: { $first: '$tablename' },
          Position: { $first: '$Position' },
          seatcapacity: { $first: '$seatcapacity' },
          description: { $first: '$description' },
          orderstatus: { $first: '$orderData.orderstatus' },
          subtractedValue: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    { $ne: ['$orderData', null] },
                    { $eq: ['$orderData.orderstatus', 'Pending'] },
                  ],
                },
                then: {
                  $cond: {
                    if: { $gte: [{ $toInt: '$seatcapacity' }, { $toInt: '$orderData.numberofperson' }] },
                    then: { $toInt: '$orderData.numberofperson' },
                    else: { $toInt: '$seatcapacity' },
                  },
                },
                else: 0,
              },
            },
          },
        },
      },
      {
        $project: {
          tablename: 1,
          Position: 1,
          seatcapacity: 1,
          description: 1,
          orderstatus: 1,
          subtractedValue: 1,
          availableSeat: { $subtract: [{ $toInt: '$seatcapacity' }, '$subtractedValue'] },
        },
      },
    ]);
  
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
  
  
  
})




module.exports = 
{getposCategory,
  getPosWaiter,
  getCustomer,
  getTable,
  getDelivery,
  getposFooditems,
  insertPos,
  getAllPos,
  runningOrder,
  completePaymeny,
  updatePayment,
  getKot,
  insertPoshold,
  getHold,
  todayOrder,
  insertQuickpay,
  getSplit,
  getMerge,getedit,
  tableorder,
  calculateTable
};