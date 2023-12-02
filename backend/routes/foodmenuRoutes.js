const express =require('express');
const router =express.Router();
const multer = require('multer');

const {getfoodCategory,getingredients,getvat,creatFoodmenu,getallfoods} =require('../controller/foodmenuController');


const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"../frontend/uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`imgae-${Date.now()}. ${file.originalname}`)
    }
  })
  
  
  // img filter
  const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("only images is allowd"))
    }
  }
  
  const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
  });

router.get('/foodcategory',getfoodCategory);
router.get('/ingredients',getingredients);
router.get('/vat',getvat);
router.post('/creatfoodmenu',upload.single("photo"),creatFoodmenu),
router.get('/getallfoodmenu',getallfoods)



module.exports =router;