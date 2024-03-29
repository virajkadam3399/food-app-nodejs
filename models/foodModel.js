const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    title:{
        type:String,
        required : [true, 'Food title is require'],
    },
    description:{
        type:String,
        required:[true, 'food description is require'],
    },
    price:{
        type:Number,
        required:[true, 'food price is require'],
    },
    imageUrl:{
        type:String,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsimilarpng.com%2Fgood-food-logo-design-on-transparent-background-png%2F&psig=AOvVaw1HCmUs4Bc3wFooXUI_5TFt&ust=1711473492686000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCBsuv1j4UDFQAAAAAdAAAAABAd",
    },
    foodTags:{
        type:String,
    },
    category:{
        type:String,
    },
    code:{
        type:String,
    },
    isAvailable:{
        type:Boolean,
        default:true,
    },
    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Resturant",
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5,
    },
    ratingCount:{
        type:String,
    },

},{timestamps: true})

module.exports = mongoose.model("Foods", foodSchema);