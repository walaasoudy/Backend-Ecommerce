
const express = require("express");
const { signup, login } = require("../services/user");

const router = express.Router();
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);

module.exports = router;
