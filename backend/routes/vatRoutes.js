const express =require('express');
const router =express.Router();

const {
    createVat,
    getallVat,
    getVat,
    updateVat,
    deleteVat,
    updateVatStatus
} =require('../controller/vatController');

router.post('/createvat',createVat);
router.get('/allvat',getallVat);
router.get('/getvat/:id',getVat);
router.put('/updateVat/:id',updateVat);
router.delete('/deleteVat/:id',deleteVat);
router.put('/updateStatus',updateVatStatus);

module.exports =router;