const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");

// Generate token
// Generate token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME, // تأكد من أن القيمة صالحة
  });
};


// @desc    Signup
exports.signup = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({ name, email, password, role });

  const token = generateToken(user._id);
  res.status(201).json({ data: user, token });
});

// @desc    Login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new ApiError("Invalid email or password", 401));
  }

  const token = generateToken(user._id);
  res.status(200).json({ data: user, token });
});
