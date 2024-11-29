const express =require('express');
const router =express.Router();

const {createCategory,
    getallCagtegory,
    getUser,
    updateCategory,
    deleteCategory,
    updateCategoryStatus
} =require('../controller/categoryController');

router.post('/createcategory',createCategory);
router.get('/allcategory',getallCagtegory);
router.get('/getcategory/:id',getUser);
router.put('/updatecategory/:id',updateCategory);
router.delete("/deletecategory/:id", deleteCategory);
router.put('/updatestatus',updateCategoryStatus);

module.exports =router;