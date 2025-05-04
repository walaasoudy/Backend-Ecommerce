const express = require("express");
const router = express.Router();
const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brand");

const {
  createbrandValidator,
  getbrandValidator,
  updatebrandValidator,
  deletebrandValidator,
} = require("../utils/validators/brand");

router.route("/").get(getBrands).post(createbrandValidator, createBrand);
router.route("/:id").get(getbrandValidator, getBrand);
router.route("/:id").patch(updatebrandValidator, updateBrand);
router.route("/:id").delete(deletebrandValidator, deleteBrand);

module.exports = router;
