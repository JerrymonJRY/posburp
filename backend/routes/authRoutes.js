const express =require('express');
const router =express.Router();

const {
    createUser,
    loginUserController,
    logout,
    dashboard,
    vertifyUser,
    getallUsers,
    editUser,
    updateUser,
    changePassword,
    forgotpassword,
    deactivate,
    activate
} =require('../controller/userController');

router.post('/register',createUser);
router.post('/login',loginUserController);
router.get('/dashboard',dashboard);
router.get('/logout',logout);
router.post('/userData',vertifyUser);
router.get('/getusers',getallUsers);
router.get('/edituser/:id',editUser);
router.put('/updateuser/:id',updateUser);
router.post('/changePassword',changePassword);
router.post('/forgotpassword',forgotpassword);
router.put('/deactivate/:id',deactivate);
router.put('/activate/:id',activate);

module.exports =router;