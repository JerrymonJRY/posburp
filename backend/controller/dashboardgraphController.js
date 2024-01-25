

const asyncHandler =require('express-async-handler');
const Pos = require("../models/posModels");

const monthlyGraphsales = asyncHandler(async (req, res) => {
    try {
      const result = await Pos.aggregate([
        {
          $match: {
            paymentstatus: "paid",
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            monthlySales: { $sum: { $toDouble: "$grandTotal" } }
          }
        }
      ]).exec();
  
   //   console.log(result);
  
      const monthlySalesData = result.map(entry => ({
        month: entry._id,
        sales: entry.monthlySales
      }));
  
      res.json({ monthlySalesData });
    } catch (err) {
      // Handle any errors
      console.error('Error executing query', err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });


  const dailyGraphSales = asyncHandler(async (req, res) => {
    try {
      const result = await Pos.aggregate([
        {
          $match: {
            paymentstatus: "paid",
            createdAt: {
              $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) // Filter for the last 7 days
            }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            dailySales: { $sum: { $toDouble: "$grandTotal" } }
          }
        }
      ]).exec();
  
      console.log(result);
  
      const dailySalesData = result.map(entry => ({
        day: entry._id,
        sales: entry.dailySales
      }));
  
      res.json({ dailySalesData });
    } catch (err) {
      // Handle any errors
      console.error('Error executing query', err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  const weeklyGraphsales = asyncHandler(async (req, res) => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // JavaScript months are zero-based

        const result = await Pos.aggregate([
            {
                $match: {
                    paymentstatus: "paid",
                    createdAt: {
                        $gte: new Date(currentYear, currentMonth - 1, 1), // Start of the current month
                        $lte: new Date(currentYear, currentMonth, 0) // End of the current month
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt"
                        }
                    },
                    weeklySales: { $sum: { $toDouble: "$grandTotal" } }
                }
            }
        ]).exec();

       /// console.log(result);

        const weeklySalesData = {};

        result.forEach(entry => {
            const { _id, weeklySales } = entry;

            const weekStartDate = new Date(_id);
            const weekEndDate = new Date(weekStartDate);
            weekEndDate.setDate(weekEndDate.getDate() + 6); // Add 6 days to get the end of the week

            const weekKey = `${weekStartDate.toISOString()} - ${weekEndDate.toISOString()}`;

            weeklySalesData[weekKey] = { weekStartDate, weekEndDate, sales: weeklySales };
        });

        res.json({ weeklySalesData });
    } catch (err) {
        // Handle any errors
        console.error('Error executing query', err);
        res.status(500).json({ error: 'An error occurred' });
    }
});








  const monthlyWeeklyGraphsales = asyncHandler(async (req, res) => {
    try {
        // Get the current date
        const currentDate = new Date();
        
        // Set the timezone (if needed)
        // currentDate.setTimeZone("YourTimeZone");

        // Get the first and last days of the current month
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        ///console.log(lastDayOfMonth);

        const result = await Pos.aggregate([
            {
                $match: {
                    paymentstatus: "paid",
                    createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } // Filter for the current month
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        week: { $isoWeek: "$createdAt" }
                    },
                    monthlySales: { $sum: { $toDouble: "$grandTotal" } }
                }
            },
            {
                $group: {
                    _id: "$_id.month",
                    weeks: { $push: { week: "$_id.week", sales: "$monthlySales" } }
                }
            },
            {
                $sort: { "_id": 1 }
            }
        ]).exec();

      ///  console.log(result);

        res.json({ monthlyWeeklySalesData: result });
    } catch (err) {
        // Handle any errors
        console.error('Error executing query', err);
        res.status(500).json({ error: 'An error occurred' });
    }
});




const dailyHighestSales = asyncHandler(async (req, res) => {
  try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const posinvoice = await Pos.aggregate([
          {
              $match: {
                  paymentstatus: "paid",
                  date: {
                      $gte: today,
                      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
                  },
              },
          },
          {
              $lookup: {
                  from: "waiters",
                  localField: "waiterId",
                  foreignField: "_id",
                  as: "waiter",
              },
          },
          {
              $unwind: "$waiter",
          },
          {
              $unwind: "$cart",
          },
          {
              $group: {
                  _id: "$cart.foodmenuId",
                  foodmenuname: { $first: "$cart.foodmenuname" },
                  totalQuantity: { $sum: { $toInt: "$cart.quantity" } }, // Sum of quantities for each food menu item
              },
          },
          {
              $sort: { totalQuantity: -1 },
          },
          {
              $match: { totalQuantity: { $gt: 5 } } // Filter out items with totalQuantity less than or equal to 5
          }
      ]);

      res.json(posinvoice);
  } catch (error) {
      console.error('Error fetching "notpaid" orders:', error);
      // Handle the error appropriately
  }
});



  
  
  




  
  


  
module.exports ={monthlyGraphsales,dailyGraphSales,weeklyGraphsales,monthlyWeeklyGraphsales,dailyHighestSales}
  