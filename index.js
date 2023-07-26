const express = require('express')
const {dbConnect} = require('./config/dbConnect')
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser')

const userRoute = require('./Routes/UserRoute');
const app = express();
const PORT = 3001;

dbConnect();
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/',userRoute);

app.listen(PORT,() => {
    console.log("server listing on: ",PORT);
})