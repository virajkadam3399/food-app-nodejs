const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
//Get user info
const getUserController = async(req,res)=>{
   try {
    //find user
    const user = await userModel.findById({_id:req.body.id})
    //validation
    if(!user){
        return res.status(500).send({
            success:false,
            message:"user not found"
        })
    }
    //hide password 
    user.password = undefined
    //resp
    res.status(200).send({
        success : true,
        message : "User get successfully",
        user
    })
    
   } catch (error) {
        console.log(error);   
        re.status(500).send({
            success : false,
            message : "Error in get user API"
        })
   }
}

//Update user
const updateUserController=async(req,res)=>{
    try {
        //find user
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success : false,
                message : "User not found"
            })
        }
        //update
        const {username, address, phone} = req.body
        if(username) user.username = username
        if(address) user.address = address
        if(phone) user.phone = phone
        //save user
        await user.save()
        res.status(200).send({
            success : false,
            message : "User updated successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message : "Error in update user API"
        })
    }
}

//update user password
const updatePasswordController = async(req,res)=>{
    try {
        //find user
        const user = await userModel.findById({ _id: req.body.id });
        //valdiation
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "Usre Not Found",
          });
        }
        // get data from user
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
          return res.status(500).send({
            success: false,
            message: "Please Provide old or new Password",
          });
        }
        //check user password  | compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          return res.status(500).send({
            success: false,
            message: "Invalid old password",
          });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
          success: true,
          message: "Password Updated!",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error In Password Update API",
          error,
        });
      }
}

//Reset password
const resetPasswordController = async(req,res)=>{
  try {
      const {email, newPassword, answer} = req.body
      if(!email || !newPassword || !answer){
        return res.status(500).send({
          success : false,
          message : "Please provide all fields"
        })
      }
      const user = await userModel.findOne({email, answer})
      if(!user){
        return res.status(500).send({
          success : false,
          message: "User not found or invalid answer"
        })
      }
      //hashing password
      var salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword
      await user.save();
      res.status(200).send({
        success : true,
        message : "Password reset successfully"
      })
  } catch (error) {
      console.log(error);
      res.status(500).send({
        success : false,
        message : "Error in reset password API"
      })
  }
}

//delete profile account
const deleteProfileController = async(req,res)=>{
  try {
      await userModel.findByIdAndDelete(req.params.id);
      return res.status(200).send({
        success : true,
        message : "Your account has been deleted"
      })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in delete profile API"
    })
  }
}




module.exports = {getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController};