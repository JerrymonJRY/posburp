const express =require('express');
const router =express.Router();

const {
    createTable,
    getallTable,
    getTable,
    updateTable,
    deleteTable,
    updateTableStatus
} =require('../controller/tableController');

router.post('/createtable',createTable);
router.get('/alltable',getallTable);
router.get('/gettable/:id',getTable);
router.put('/updateTable/:id',updateTable);
router.delete('/deleteTable/:id',deleteTable);
router.put('/updateStatus',updateTableStatus);


module.exports =router;