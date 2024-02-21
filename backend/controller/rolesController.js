const asyncHandler =require('express-async-handler');
const Role =require('../models/rolesModel');

const createRole =asyncHandler(async(req,res) =>{

    const rolename =req.body.rolename;
    const findRole =await Role.findOne({ rolename:rolename });
    if(!findRole)
    {
        //Create a new User
        const newRole =Role.create(req.body);
        res.json(newRole);
    }
    else{
       
        throw new Error("Role Name Already Exist");

    }

});

const getallRoles = asyncHandler(async (req, res) => {
    try {
      const getRole = await Role.find();
      res.json(getRole);
    } catch (error) {
      throw new Error(error);
    }
  });


  const getRole =asyncHandler(async(req,res) =>{

    const { id } =req.params;
   
   //console.log(id);
   try
   {
        const getrole =await Role.findById(id);
        res.json(getrole);
  
   }catch(error)
   {
    throw new Error(error);
   }
  
  });

  const updateRole =asyncHandler(async(req,res)=>{
     
    const { id } =req.params;
   
    try
    {
        const updateUser =await Role.findByIdAndUpdate(id,{
          rolename:req?.body?.rolename,
          description:req?.body?.description,
          
  
        },
        {
            new:true,
        }
        );
  
        res.json(updateUser);
    }
    catch(error)
    {
        throw new Error(error);
    }
  
  
  });


  const deleteVat = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // validateMongoDbId(id);
  
    try {
      const deleteCategory = await Role.findByIdAndDelete(id);
      res.json({
        deleteCategory,
      });
    } catch (error) {
      throw new Error(error);
    }
  });



module.exports = {createRole,getallRoles,getRole,updateRole,deleteVat};