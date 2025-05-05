const Product = require("../models/product");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

exports.createProduct = asyncHandler(async (req, res) => {
  const { title, description, quantity, price, category, subCategory, image } =
    req.body;
  const product = await Product.create({
    title,
    slug: slugify(title),
    description,
    quantity,
    price,
    image,
    category,
    subCategory,
  });
  res.status(201).json({ data: product });
});

exports.getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate("category subCategory");
  res.status(200).json({ results: products.length, data: products });
});

exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "category subCategory"
  );
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ data: product });
});
exports.updateProduct = asyncHandler(async (req, res) => {
  const { title, description, quantity, price, category, subCategory, image } =
    req.body;
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      title,
      slug: slugify(title),
      description,
      quantity,
      price,
      image,
      category,
      subCategory,
    },
    { new: true }
  );
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ data: product });
    });
    
exports.deleteProduct = asyncHandler(async (req, res) => {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(204).send();
    });
  