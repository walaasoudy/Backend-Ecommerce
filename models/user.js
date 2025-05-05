const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name required"],
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password required"],
      minlength: 6,
      select: false, // hide by default
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

module.exports = mongoose.model("User", userSchema);
