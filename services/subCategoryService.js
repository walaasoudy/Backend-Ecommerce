const slugify = require("slugify");
const SubCategory = require("../models/subCategoryModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

// @desc    Get all subcategories (optionally filtered by category)
exports.getSubCatogeries = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const filter = req.body.category ? { category: req.body.category } : {};

  const subCategories = await SubCategory.find(filter)
    .limit(limit)
    .skip(skip)
    .populate("category");

  if (!subCategories.length) {
    return next(new ApiError("No subcategories found", 404));
  }

  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

// @desc    Get specific subcategory by ID
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const subCategory = await SubCategory.findById(req.params.id).populate(
    "category"
  );
  if (!subCategory) {
    return next(new ApiError("Subcategory not found", 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc    Create a new subcategory
exports.createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;

  if (!category) {
    return next(new ApiError("Category ID is required", 400));
  }

  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });

  res.status(201).json({ data: subCategory });
});

// @desc    Update a subcategory
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;

  const updateData = {};
  if (name) updateData.name = name;
  if (name) updateData.slug = slugify(name);
  if (category) updateData.category = category;

  const subCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  if (!subCategory) {
    return next(new ApiError("Subcategory not found", 404));
  }

  res.status(200).json({ data: subCategory });
});

// @desc    Delete a subcategory
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

  if (!subCategory) {
    return next(new ApiError("Subcategory not found", 404));
  }

  res.status(204).send();
});
