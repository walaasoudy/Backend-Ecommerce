const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, lowercase: true },
    description: String,
    quantity: Number,
    price: Number,
    image: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
