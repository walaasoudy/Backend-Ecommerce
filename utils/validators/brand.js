const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getbrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand id format"),
];

exports.createbrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand required")
    .isLength({ min: 2 })
    .withMessage("Too short brand name")
    .isLength({ max: 32 })
    .withMessage("Too long brand name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.updatebrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand id format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

exports.deletebrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand id format"),
  validatorMiddleware,
];

exports.getbrandProductsValidator = [
  check("id").isMongoId().withMessage("Invalid brand id format"),
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

exports.getbrandProductsCountValidator = [
  check("id").isMongoId().withMessage("Invalid brand id format"),
  validatorMiddleware,
];
