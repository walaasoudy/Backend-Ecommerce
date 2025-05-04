const brandModel = require("../models/brand");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const slugify = require("slugify");

// Get brands
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const brands = await brandModel.find({}).limit(limit).skip(skip);
  res.status(200).json({ results: brands.length, page, data: brands });
});

// Get a specific brand
exports.getBrand = asyncHandler(async (req, res) => {
  const brand = await brandModel.findById(req.params.id);
  if (!brand) {
    res.status(404).json({ message: "Brand not found" });
  }
  res.status(200).json({ data: brand });
});

// Create a brand
exports.createBrand = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  // Check if brand with same name exists
  const existingBrand = await brandModel.findOne({ name });
  if (existingBrand) {
    return next(new ApiError(`Brand with name "${name}" already exists`, 400));
  }

  const brand = await brandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// Update a brand
exports.updateBrand = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const brand = await brandModel.findByIdAndUpdate(
    req.params.id,
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    res.status(404).json({ message: "Brand not found" });
  }
  res.status(200).json({ data: brand });
});

// Delete a brand
exports.deleteBrand = asyncHandler(async (req, res) => {
  const brand = await brandModel.findByIdAndDelete(req.params.id);
  if (!brand) {
    res.status(404).json({ message: "Brand not found" });
  }
  res.status(204).send();
});
