const express = require("express");
const router = express.Router();
const productController = require("../services/product");
const {
  createProductValidator,
  updateProductValidator,
  getProductValidator,
  deleteProductValidator,
  getAllProductsValidator,
} = require("../utils/validators/product");

// @desc    Create new product
router.post("/", createProductValidator, productController.createProduct);

// @desc    Get all products
router.get("/", getAllProductsValidator, productController.getAllProducts);

// @desc    Get specific product by ID
router.get("/:id", getProductValidator, productController.getProduct);

// @desc    Update product by ID
router.put("/:id", updateProductValidator, productController.updateProduct);

// @desc    Delete product by ID
router.delete("/:id", deleteProductValidator, productController.deleteProduct);

module.exports = router;
