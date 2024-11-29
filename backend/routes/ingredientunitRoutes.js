const express =require('express');
const router =express.Router();

const {createIngunit,
    getallIngunit,
    getingunit,
    updateingUnit,
    deleteIngUnit,
    updateingredientUnitStatus
} =require('../controller/ingredientunitController');

router.post('/createingunit',createIngunit);
router.get('/allingunit',getallIngunit);
router.get('/getingunit/:id',getingunit);
router.put('/updateingunit/:id',updateingUnit);
router.delete('/deleteIngUnit/:id',deleteIngUnit);
router.put('/updateStatus',updateingredientUnitStatus);


module.exports =router;