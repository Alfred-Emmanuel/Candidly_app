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
  // userType: {
  //   type: String,
  //   enum: ["user", "organization"],
  //   required: true,
  //   default: "organization",
  // },
  emailVerified: {
    type: Boolean,
    default: function () {
      return this.userType === "user" ? null : false;
    },
  },
  verificationToken: Joi.string(),
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
    { expiresIn: '24h' }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
    emailVerified: Joi.boolean(),
    verificationToken: Joi.string(),
  });

  return schema.validate(user);
}

module.exports = {
  User,
  userSchema,
  validateUser,
  generateAuthToken: userSchema.methods.generateAuthToken,
};
