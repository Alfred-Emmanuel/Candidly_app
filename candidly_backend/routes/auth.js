const express = require("express");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models/user");
const { Message } = require("../models/message");

// To login
router.post("/", async (req, res) => {
  // Validate the request body
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser && !existingUser.emailVerified) {
    return res.status(400).json({ message: "Please verify your email first."});
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Invalid Email or Password."});
  } else {
    const validPassword = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!validPassword) {
      return res.status(400).json({message: "Invalid Email or Password."});
    }

    const userId = existingUser._id;
    const messages = await Message.find({ receiver: userId });
    const messagesCount = messages.length;

    const authToken = existingUser.generateAuthToken("5d");
    const response = {
      user: _.pick(existingUser, ["_id", "name", "email", "emailVerified", "orgLink"]),
      // messagesCount: messagesCount, 
      messages: messages,
    };
    
    res
      .header("x-authentication", authToken)
      .json(response);
  }
});

function validate(req) {
  const schema = Joi.object({
    // userType: Joi.string().valid("user", "organization").required(),
    email: Joi.string().min(5).max(255).email().when("userType", {
      is: "organization",
      then: Joi.required(),
    }),
    password: Joi.string().min(5).max(255).when("userType", {
      is: "organization",
      then: Joi.required(),
    }),
  });

  return schema.validate(req);
}

module.exports = router;
