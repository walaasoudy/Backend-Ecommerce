const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: true,
      minlength: [3, "Too short brand name"],
      maxlength: [32, "Too long brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;
