const express =require('express');
const router =express.Router();

const {todayOrder,totalOrder,todaypaidsales,oveallsales} =require('../controller/dashboardController');
const {monthlyGraphsales,dailyGraphSales,weeklyGraphsales,monthlyWeeklyGraphsales,dailyHighestSales} =require('../controller/dashboardgraphController');

router.get('/todayorder',todayOrder);
router.get('/totalorder',totalOrder);
router.get('/todaypaidsales',todaypaidsales);
router.get('/oveallsales',oveallsales);


//Graph
router.get('/monthlygraph',monthlyGraphsales);
router.get('/dailygraph',dailyGraphSales);
router.get('/weeklygraph',weeklyGraphsales);
router.get('/monthlywiseweek',monthlyWeeklyGraphsales);
router.get('/dailyhighestsales',dailyHighestSales)

module.exports =router;