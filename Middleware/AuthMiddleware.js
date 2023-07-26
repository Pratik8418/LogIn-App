const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const User = require('../Models/User');

const authMiddleware = asyncHandler(
  async (req,res,next) => {
    console.log(req.headers.cookie.split("=")[1]);
    const cookie = req.headers.cookie;
    const token = cookie.split("=")[1];
    try{
       if(token){
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
       }
    }catch(error){
      throw new Error("Token is expired please Login again");
    }
    
    //  if(req.headers.authorization.startsWith("Bearer")){
    //   const token = req.headers.authorization.split(" ")[1];
    //   try{
    //     if(token){
    //        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    //        const user = await User.findById(decoded.id);
    //        req.user = user;
    //        next();
    //     }
    //   }catch(error){
    //     throw new Error("Token is expired please Login again");
    //   } 
    // }else{
    //   throw new Error("Token not attched with Header");
    // }
  }
)

module.exports = {authMiddleware}