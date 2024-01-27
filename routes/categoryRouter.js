const express = require('express');
const router = express.Router();
const validation = require('../middlewares/validatorMiddleware');
const {validationResult,param} = require('express-validator');
const {getCategoryValidator,createCategoryValidator,updateCategoryValidator,deleteCategoryValidator} = require('../utils/validators/categoryValidator')
const {getCatogeries,createCategory ,getCategory,updateCategory ,deleteCategory  } = require('../services/categoryServices');
router.route('/').get(getCatogeries).post(createCategoryValidator,createCategory);
router.route('/:id').get(getCategoryValidator, getCategory);

router.route('/:id').patch(updateCategoryValidator,updateCategory);
router.route('/:id').delete(deleteCategoryValidator,deleteCategory);
module.exports = router;
// Path: services/categoryServices.js

