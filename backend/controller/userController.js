const User =require('../models/userModel');
const asyncHandler =require('express-async-handler');
const { generateRefreshToken }=require('../config/refreshToken');
const { generateToken } = require('../config/jwToken');

const createUser =asyncHandler(async(req,res) =>{

    const email =req.body.email;
    const findUser =await User.findOne({ email:email });
    if(!findUser)
    {
        //Create a new User
        const newUser =User.create(req.body);
        res.json(newUser);
    }
    else{
       
        throw new Error("User Already Exist");

    }
});


const loginUserController =asyncHandler(async(req,res) =>{

    const { email,password} =req.body;
    const findUser =await User.findOne({email});
   
    if(findUser && (await findUser.isPasswordMatched(password)))
    {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const currentDateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const shiftToken = `${findUser?.firstname}-${findUser?.lastname}-${currentDateTime}`;
      
        const updateuser = await User.findByIdAndUpdate(
            findUser.id,
            {
              refreshToken: refreshToken,
              shifttoken: shiftToken,
            },
            { new: true }
          );
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
          });

        res.json({
            _id:findUser?._id,
            firstname:findUser?.firstname,
            lastname:findUser?.lastname,
            email:findUser?.email,
            mobile:findUser?.mobile,
            token:generateToken(findUser?._id),
            shifttoken: shiftToken,
            userrole:findUser?.userrole,
            shiftacess:findUser?.shiftacess,



        });
    }
    else
    {
        throw new Error("Invalid Details");
    }

});

const vertifyUser =asyncHandler(async(req,res,next) =>{
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) { }
})

const dashboard =asyncHandler(async(req,res)=>{
 // const token =req.cookies.token;
 // console.log(token);

    
})



const logout = asyncHandler(async (req, res) => {
    // const cookie = req.cookies;
    // if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    // const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204); // forbidden
    }
    await User.findOneAndUpdate(refreshToken, {
      refreshToken: "",
     
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204); // forbidden
  });

  const getallUsers = asyncHandler(async (req, res) => {
    try {
      const getUsers = await User.find();
      res.json(getUsers);
    } catch (error) {
      throw new Error(error);
    }
  });


  const editUser =asyncHandler(async(req,res) =>{

    const { id } =req.params;
   
    //console.log(id);
    try
    {
         const getuser =await User.findById(id);
         res.json(getuser);
   
    }catch(error)
    {
     throw new Error(error);
    }
  });


  const updateUser =asyncHandler(async(req,res)=>{
     
    const { id } =req.params;
   
    try
    {
        const updateUser =await User.findByIdAndUpdate(id,{
          firstname:req?.body?.firstname,
          lastname:req?.body?.lastname,
          email:req?.body?.email,
          mobile:req?.body?.mobile,
          userrole:req?.body?.userrole,
        
          
  
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


module.exports={ createUser,loginUserController,logout,dashboard,vertifyUser,getallUsers,editUser,updateUser};