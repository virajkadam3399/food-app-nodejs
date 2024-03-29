const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createResturantController, getAllResturantController, getResturantById, deleteResturantController } = require('../controllers/resturantController');

const router = express.Router();

//routes
//Create resturant || POST
router.post('/create', authMiddleware, createResturantController);

//Get all resturant || Get
router.get('/getAll', getAllResturantController);

//Get resturant by id || Get
router.get('/get/:id', getResturantById);

//delete resturant
router.delete('/delete/:id', authMiddleware, deleteResturantController);
module.exports = router;