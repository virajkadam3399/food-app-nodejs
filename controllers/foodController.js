const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

//Create food
const createFoodController =async(req,res)=>{
    try {
        const {title, description, price, imageUrl, foodTags, category, code, isAvailable, resturant, rating} = req.body;

        if(!title || !description || !price || !resturant){
            return res.status(500).send({
                success : false,
                message : "Please provide all fields"
            });
        }

        const newFood = new foodModel({title, description, price, imageUrl, foodTags, category, code, isAvailable, resturant, rating})
        await newFood.save();
        res.status(200).send({
            success : true,
            message : "New food item created",
            newFood,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in create food api"
        });
    }
}

//get all food
const getAllFoodController = async(req,res)=>{
    try {
        const foods = await foodModel.find({})
        if(!foods){
            return res.status(404).send({
                success : false,
                message : "No food item was found"
            });
        }
        res.status(200).send({
            success : true,
            totalFoods : foods.length,
            foods,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in get all food api "
        })
    }
}

//get single food
const getSingleFoodController = async(req,res)=>{
    try {
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success : false,
                message : "Please provide id"
            })
        }
        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success : false,
                message : "No food found with this id"
            })
        }
        res.status(200).send({
            success : true,
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message: "Error in get single food api"
        })
    }
}

//get food by resturant
const getFoodByResturantController = async(req,res)=>{
    try {
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(404).send({
                success : false,
                message : "Please provide id"
            })
        }
        const food = await foodModel.find({resturant:resturantId});
        if(!food){
            return res.status(404).send({
                success : false,
                message : "No food found with this id"
            })
        }
        res.status(200).send({
            success : true,
            message : "Food base on resturant",
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message: "Error in get single food api"
        })
    }
}

//update food item
const updateFoodController =async(req,res)=>{
    try {
        const foodID = req.params.id;
        if (!foodID) {
          return res.status(404).send({
            success: false,
            message: "no food id was found",
          });
        }
        const food = await foodModel.findById(foodID);
        if (!food) {
          return res.status(404).send({
            success: false,
            message: "No Food Found",
          });
        }
        const {
            title, description, price, imageUrl, foodTags, category, code, isAvailable, resturant, rating,
        } = req.body;
        const updatedFood = await foodModel.findByIdAndUpdate(
          foodID,
          {
            title, description, price, imageUrl, foodTags, category, code, isAvailable, resturant, rating,
          },
          { new: true }
        );
        res.status(200).send({
          success: true,
          message: "Food Item Was Updated",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in update food api"
        })
    }
}

//delete food
const deleteFoodController = async(req,res)=>{
    try {
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success : false,
                message : "Provide food id"
            })
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            return res.status(404).send({
                success : false,
                message: "No food found with this id"
            })
        }
        await foodModel.findByIdAndDelete(foodId)
        res.status(200).send({
            success : true,
            message : "Food item deleted"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in delete food  api"
        })
    }
}

//place order
const placeOrderController =async(req,res)=>{
    try {
        const {cart} =req.body;
        if(!cart){
            return res.status(500).send({
                success : false,
                message : "Please add food cart or payment method"
            })
        }

        let total = 0;
        cart.map((i)=>{
            total +=i.price
        })
        const newOrder = new orderModel({
            foods : cart,
            payment : total,
            buyer:req.body.id
        }) 
        await newOrder.save();
        res.status(200).send({
            success : true,
            message : "Order placed successfully",
            newOrder
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in place order api"
        })
    }
}

//change order status
const orderStatusController = async(req,res)=>{
    try {
        const orderId = req.params.id;
        if(!orderId){
            return res.status(404).send({
                success : false,
                message: "Please provide valid order id"
            })
        }
        const {status} = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId, {status}, {new:true})
        res.status(200).send({
            success : true,
            message : "Order status updated"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in order status api"
        })
    }
}

module.exports = {createFoodController, getAllFoodController, getSingleFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController}
