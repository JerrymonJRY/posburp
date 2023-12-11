const express =require('express');
const router =express.Router();

const { createCash } =require('../controller/cashdropController');

router.post('/cashcreate',createCash);

module.exports =router;