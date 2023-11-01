const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50,
  },
  email: {
    type: String,
    minlength: 0,
    maxlength: 255,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 0,
    maxlength: 1024,
    trim: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: Joi.string(),
  orgLink: Joi.string(),
  forgotPasswordToken: Joi.string(),
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id /**userType: this.userType **/ },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required().trim(),
    forgotPasswordToken: Joi.string(),
    emailVerified: Joi.boolean(),
    orgLink: Joi.string().uri(),
    verificationToken: Joi.string(),
  });

  return schema.validate(user);
}

function validatePasswordReset(password) {
  const schema = Joi.string().min(6).trim().required();

  return schema.validate(password);
}

module.exports = {
  User,
  userSchema,
  validateUser,
  generateAuthToken: userSchema.methods.generateAuthToken,
  validatePasswordReset,
};
