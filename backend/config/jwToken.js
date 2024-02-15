const jwt =require('jsonwebtoken');

const generateToken =(id) =>
{

    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"3d"});
};


const resetToken =(id) =>
{

    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1h"});
};


module.exports={ generateToken,resetToken };