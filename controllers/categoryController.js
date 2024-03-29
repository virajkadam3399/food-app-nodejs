const categoryModel = require("../models/categoryModel");

//create category
const createCategoryController = async(req,res)=>{

    try {
        const {title, imageUrl} = req.body;
        if(!title){
            return res.status(500).send({
                success : false,
                message :"please provide category title or image"
            })
        }

        const newCategory = new categoryModel({title, imageUrl})
        await newCategory.save()
        res.status(200).send({
            success : true,
            message : "Category created",
            newCategory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in create category api"
        })
    }
}

//Get all category
const getAllCategoryController = async(req,res)=>{
    try {
        const categories = await categoryModel.find({})
        if(!categories){
            return res.status(404).send({
                success : false,
                message : "No categories found"
            })
        }
        res.status(200).send({
            success : true,
            totalCategory : categories.length,
            categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in get all category api"
        })
    }
}

//update category controller
const updateCategoryController =async(req,res)=>{
    try {
        const {id}= req.params
        const {title, imageUrl} = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, {title, imageUrl}, {new:true})
        if(!updatedCategory){
            return res.status(500).send({
                success : false,
                message : "No category found"
            })
        }
        res.status(200).send({
            success : true,
            message : "Category updated successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in update category api"
        })
    }
}

//delete category
const deleteCategoryController =async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(500).send({
                success : false,
                message : "please provide category Id"
            })
        }
        const category = await categoryModel.findById(id)
        if(!category){
            return res.status(500).send({
                success : false,
                message : "No category found with this id"
            })
        }
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success : true,
            message : "Category deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in delete category api"
        })
    }
}
module.exports = {createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController}