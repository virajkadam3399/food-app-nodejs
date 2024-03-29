const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

//REGISTER
const registerController = async(req,res)=>{
    try {
        const {username, email, password, address, phone, answer} = req.body;
        //validation
        if(!username || !email || !password || !address || !phone || !answer){
            return res.status(500).send({
                success : false,
                message : "Please provide all fields"
            })
        }

        //check users
        const existing = await userModel.findOne({email})
        if(existing){
            return res.status(500).send({
                success : false,
                message : "Email already registred please login"
            })
        }

        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        //create new user
        const user = await userModel.create({username, email, password : hashedPassword, address, phone, answer})
        res.status(201).send({
            success : true,
            message : 'Successfully registered',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in register API"
        })
    }
}

//LOGIN
const loginController = async(req,res)=>{
    try {
        const {email, password} = req.body;
        //validation
        if(!email || !password){
            return res.status(500).send({
                success : false,
                message : "Please provide email and password"
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success : false,
                message : "User not found"
            })
        }

        //check user password | compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(500).send({
                success : false,
                message : "Invalid credentials"
            })
        }

        //token
        const token =JWT.sign({id:user._id}, process.env.JWT_SECRET,{
            expiresIn : '7d',
        });

        res.status(200).send({
            success : true,
            message : "Login Successfully",
            token,
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in login API"
        })
    }
}

module.exports = {registerController, loginController}