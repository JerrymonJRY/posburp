const express =require('express');
const router =express.Router();

const {createExpense,getExpense} =require('../controller/expenseController');

router.post('/expensecreate',createExpense);
router.get('/allexpense',getExpense);


module.exports =router;