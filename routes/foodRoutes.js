const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getAllFoodController, getSingleFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require('../controllers/foodController');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

//routes
//Create food
router.post('/create', authMiddleware, createFoodController);

//get all food
router.get('/getAll', getAllFoodController);

//get single food
router.get('/get/:id', getSingleFoodController);

//get food by resturant
router.get('/getByResturant/:id', getFoodByResturantController);

//update food
router.put('/update/:id',authMiddleware, updateFoodController);

//delete food
router.delete('/delete/:id', authMiddleware, deleteFoodController);

//place order
router.post('/placeorder', authMiddleware, placeOrderController);

//order status
router.post('/orderStatus/:id', authMiddleware, adminMiddleware, orderStatusController);

module.exports = router;