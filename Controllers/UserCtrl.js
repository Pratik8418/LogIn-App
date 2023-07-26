const User = require('../Models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(
  async (req, res) => {
    try {
      const userFound = await User.findOne({ email: req.body.email });
      if (userFound) {
        res.status(500).send("User already Exit");
      } else {
        const password = req.body.password;
        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(password, salt);
        const user = await User.create(req.body);
        res.status(200).send(user);
      }

    } catch (error) {
      throw new Error(error);
    }
  }
)

const loginUser = asyncHandler(
  async (req, res) => {
    try {
      const userFound = await User.findOne({ email: req.body.email });
      if (!userFound) {
        res.status(404).send("User Not Found");
      } else {
        const isMatched = await bcrypt.compare(req.body.password, userFound.password);
        if (isMatched) {
          const token = jwt.sign({id: userFound._id}, process.env.JWT_SECRET_KEY,{expiresIn:"10m"});
          res.cookie(String(userFound._id), token, 
                     {
                       httpOnly: true,
                       path:"/",
                       expires: new Date(Date.now() + 1000*60*5),
                       sameSite: "lax"
                      });
          res.status(200).send({ message: "Login successfully","user": userFound,"token": token });
        } else {
          res.status(401).send("check your password again");
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
)

const getUser = asyncHandler(
  async (req,res) => {
    try{
      res.status(200).send(req.user);
    }catch(error){
      throw new Error(error.message);
    }
  }
)

module.exports = { registerUser, loginUser, getUser };
