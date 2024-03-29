const mongoose = require("mongoose");
require('dotenv').config();

// Define the MongoDB connection URL
mongoose.connect("mongodb://127.0.0.1/food-app")

//get the default connection
//mongoose maintain a default connection object representing the mongodb connection
const db = mongoose.connection;

//define event listeners for database connection
db.on("connected",()=>{
    console.log("connected to mongodb server");
})

db.on("disconnected",()=>{
    console.log("mongodb disconnected");
})

db.on("error",(err)=>{
    console.log("mongodb connection error",err);
})

//export the database connection
module.exports = db;

