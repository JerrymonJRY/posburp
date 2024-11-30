const express =require('express');
const router =express.Router();

const {
    createSupplier,
    viewSupplier,
    updateSupplier,
    getSupplier,
    updateSupplierStatus
 } =require('../controller/supplierController');

router.post('/createsupplier',createSupplier);
router.get('/allSupplier',viewSupplier);
router.put('/updateSupplier/:id',updateSupplier);
router.get('/getSupplier/:id',getSupplier);
router.put('/updateStatus',updateSupplierStatus)

module.exports =router;