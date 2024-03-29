const express = require('express');
const colors = require("colors");
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();

const db = require('./config/db');

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//route
//URL - http://localhost:8080
app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/resturant', require('./routes/resturantRoutes'));
app.use('/api/v1/category', require('./routes/categoryRoutes'));
app.use('/api/v1/food',require('./routes/foodRoutes'));


app.get('/', (req,res)=>{
    return res.status(200).send("<h1>Welcome to food server. </h1>")
})

//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT,()=>{
    console.log(`Server starting on ${PORT}`.bgMagenta.white);
})
