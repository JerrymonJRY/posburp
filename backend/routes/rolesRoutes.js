const express =require('express');
const router =express.Router();

const {createRole,getallRoles,getRole,updateRole,deleteVat} =require('../controller/rolesController');

router.post('/createRole',createRole);
router.get('/allRoles',getallRoles);
router.get('/getRole/:id',getRole);
router.put('/updateRoles/:id',updateRole);
router.delete('/deleteRole/:id',deleteVat);

module.exports =router;