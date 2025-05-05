const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title is too short")
    .isLength({ max: 100 })
    .withMessage("Title is too long")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description is too short")
    .isLength({ max: 500 })
    .withMessage("Description is too long"),

  check("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),

  check("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  check("category").isMongoId().withMessage("Invalid category ID format"),

  check("subCategory").isMongoId().withMessage("Invalid subcategory ID format"),

  check("image").optional().isURL().withMessage("Image must be a valid URL"),

  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid product ID format"),

  body("title")
    .optional()
    .custom((val, { req }) => {
      if (val) {
        req.body.slug = slugify(val);
      }
      return true;
    }),

  body("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Description is too short"),

  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid category ID format"),

  body("subCategory")
    .optional()
    .isMongoId()
    .withMessage("Invalid subcategory ID format"),

  body("image").optional().isURL().withMessage("Image must be a valid URL"),

  validatorMiddleware,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid product ID format"),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid product ID format"),
  validatorMiddleware,
];

exports.getAllProductsValidator = [
  check("page")
    .optional()
    .isNumeric()
    .withMessage("Invalid page number format"),

  check("limit")
    .optional()
    .isNumeric()
    .withMessage("Invalid limit number format"),

  validatorMiddleware,
];
