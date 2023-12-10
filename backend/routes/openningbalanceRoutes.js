const express =require('express');
const router =express.Router();


const {createBalance} =require('../controller/openningbalanceController');


router.post('/create',createBalance);

module.exports =router;