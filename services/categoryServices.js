const slugify = require('slugify');
const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError');
// getCatogeries
exports.getCatogeries = asyncHandler(async(req,res)=>
{
    const page =req.query.page*1|| 1
    const limit =req.query.limit*1|| 5
    const skip = (page-1)*limit
    const categories = await Category.find({}).limit(limit).skip(skip)
    res.status(200).json({results :categories.length ,page,data : categories})
    
})
// get specific category
exports.getCategory = asyncHandler(async(req,res)=>
{
    const category = await Category.findById(req.params.id)
   
    if(!category){
        res.status(404).json({message : 'category not found'})
    
    }
    res.status(200).json({data : category})
})


// createCategory 
exports.createCategory = asyncHandler(async(req, res) =>
{
    const name = req.body.name
    const category = await Category.create({name , slug : slugify(name)})
    res.status(201).json({data : category})
})

// updateCategory
exports.updateCategory = asyncHandler(async(req, res) =>
{
    const name = req.body.name
    const category = await Category.findByIdAndUpdate(req.params.id,{name , slug : slugify(name)},{new : true})
    if(!category){
        res.status(404).json({message : 'category not found'})
    
    }
    res.status(200).json({data : category})
})

// deleteCategory
exports.deleteCategory = asyncHandler(async(req, res) =>
{
    const category = await Category.findByIdAndDelete(req.params.id)
    if(!category){
        res.status(404).json({message : 'category not found'})
    
    }
    res.status(204).send()
})