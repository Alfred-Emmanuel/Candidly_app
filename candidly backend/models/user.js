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
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    userType: Joi.string().valid("user", "organization").required(),
    email: Joi.string().email().when('userType', { 
      is: 'organization', 
      then: Joi.required() 
    }),
    password: Joi.string().when('userType', { 
      is: 'organization', 
      then: Joi.required() 
    }),
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;
