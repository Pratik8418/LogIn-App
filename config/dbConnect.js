const mongoose = require('mongoose')

const dbConnect = () => {
  try{
    const connect = mongoose.connect("mongodb://localhost:27017/Login-App")
    console.log("Database connected");
  }catch(error){
    console.log("Database Error " + error);
  }
}

module.exports = {dbConnect}