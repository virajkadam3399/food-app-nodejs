const express = require('express');
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//routes
//Get user
router.get('/getUser', authMiddleware, getUserController)

//Update profile
router.put("/updateUser", authMiddleware, updateUserController)

//update password
router.put('/updatePassword', authMiddleware, updatePasswordController)

//Reset Password
router.post("/resetPassword", authMiddleware, resetPasswordController)

//delete user
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController)


module.exports = router;