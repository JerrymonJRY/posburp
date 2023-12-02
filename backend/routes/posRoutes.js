const express =require('express');
const router =express.Router();

const {getposCategory,
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
    getMerge
} =require('../controller/posController');


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



module.exports =router;