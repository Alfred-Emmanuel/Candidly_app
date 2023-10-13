const mongoose = require("mongoose");
const Joi = require("joi");

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
    default: "",
  },
  password: {
    type: String,
    minlength: 0,
    maxlength: 1024,
    trim: true,
    default: "",
  },
  userType: {
    type: String,
    enum: ["user", "organization"],
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: Joi.string(),
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    userType: Joi.string().valid("user", "organization").required(),
    email: Joi.string().min(5).max(255).email().when("userType", {
      is: "organization",
      then: Joi.required(),
    }),
    password: Joi.string().min(5).max(255).when("userType", {
      is: "organization",
      then: Joi.required(),
    }),
    emailVerified: Joi.boolean(),
    verificationToken: Joi.string(),
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;
