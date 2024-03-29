const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title:{
        type : String,
        required : [true, 'category title is required'],
    },
    imageUrl:{
        type:String,
        default :"https://www.google.com/url?sa=i&url=https%3A%2F%2Fsimilarpng.com%2Fgood-food-logo-design-on-transparent-background-png%2F&psig=AOvVaw1HCmUs4Bc3wFooXUI_5TFt&ust=1711473492686000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCBsuv1j4UDFQAAAAAdAAAAABAd"
    }


},{timestamps: true})

module.exports = mongoose.model("Category", categorySchema);