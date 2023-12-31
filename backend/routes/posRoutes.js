const express =require('express');
const router =express.Router();

const {getposCategory,
    getPosWaiter,
    getCustomer,
    getTable,
    getDelivery,
    getposFooditems,
    insertPos,
    updatePayment,
    insertPoshold,
    getHold,
    todayOrder,
    insertQuickpay,
    tableorder,
    calculateTable,
    getorders
} =require('../controller/posController');

const {updatePosorder} =require('../controller/posUpdateController')
const {getAllPos,completePaymeny} =require('../controller/posneworderController')
const {runningOrder,getKot,getedit,getSplit,getMerge} =require('../controller/posrunningorderController')
const {todayDelivery} =require('../controller/posdeliveryController')
const {posinvoiceReport} =require('../controller/posinvoiceReportController')
const {closingbalance,closeShift} = require('../controller/closingbalanceController');

router.get('/poscategory',getposCategory);
router.get('/posWaiter',getPosWaiter);
router.get('/posCustomer',getCustomer);
router.get('/posTable',getTable);
router.get('/posDelivery',getDelivery);
router.get('/posfood',getposFooditems);
router.post('/createpos',insertPos);
router.get('/getPos',getAllPos);
router.get('/getrunningorder',runningOrder);
router.get('/getcomplete/:id',completePaymeny);
router.put('/updatePayment/:id',updatePayment);
router.get('/getKot/:id',getKot);
router.post('/createHold',insertPoshold);
router.get('/gethold',getHold);
router.get('/gettodayOrder',todayOrder);
router.post('/createQuickpay',insertQuickpay);
router.get('/getsplit/:id',getSplit);
router.post('/getmerge',getMerge);
router.get('/getEdit/:id',getedit);
router.get('/tableorder',tableorder);
router.get('/calculate',calculateTable);
router.put('/updatepos/:id',updatePosorder);
router.get('/gettodaydelivery',todayDelivery);
router.get('/invoicereport',posinvoiceReport);
router.get('/closingBalance',closingbalance)
router.put('/closeShift',closeShift);
router.get('/getOrders/:id',getorders);



module.exports =router;