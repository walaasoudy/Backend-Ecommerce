const slugify = require('slugify');
const SubCategory = require('../models/subCategoryModel'); // Renamed to SubCategory to avoid naming conflicts
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');

// getsubCatogeries
exports.getSubCatogeries = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const subCategories = await SubCategory.find({}).limit(limit).skip(skip);
    res.status(200).json({ results: subCategories.length, page, data: subCategories });
});

// get specific subcategory
exports.getSubCategory = asyncHandler(async (req, res) => {
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) {
        res.status(404).json({ message: 'subcategory not found' });
    }
    res.status(200).json({ data: subCategory });
});

// create sub category
exports.createSubCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const subCategory = await SubCategory.create({ name, slug: slugify(name) });
    res.status(201).json({ data: subCategory });
});

// updateSubCategory
exports.updateSubCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, { name, slug: slugify(name) }, { new: true });
    if (!subCategory) {
        res.status(404).json({ message: 'subcategory not found' });
    }
    res.status(200).json({ data: subCategory });
});

// deleteSubCategory
exports.deleteSubCategory = asyncHandler(async (req, res) => {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subCategory) {
        res.status(404).json({ message: 'subcategory not found' });
    }
    res.status(204).send();
});
