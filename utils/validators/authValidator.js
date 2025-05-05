const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// signup validator
exports.signupValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  check("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be either user or admin"),

  validatorMiddleware,
];

// login validator
exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  check("password").notEmpty().withMessage("Password is required"),

  validatorMiddleware,
];
