const express = require('express');
const router = express.Router();
const validation = require('../middlewares/validatorMiddleware');
const { validationResult, param } = require('express-validator');
const {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require('../utils/validators/subCategoryValidator');
const {
  getSubCatogeries,
  createSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require('../services/subCategoryService');
router.route('/').get(getSubCatogeries).post(createSubCategoryValidator, createSubCategory);
router.route('/:id').get(getSubCategoryValidator, getSubCategory);
router.route('/:id').patch(updateSubCategoryValidator, updateSubCategory);
router.route('/:id').delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;