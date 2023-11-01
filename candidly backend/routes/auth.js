const express = require("express");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models/user");

// To login
router.post("/", async (req, res) => {
  // Validate the request body
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const existingUser = await User.findOne({ email: req.body.email });

  if (!existingUser) {
    return res.status(400).json("Invalid Email or Password.");
  } else {
    const validPassword = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!validPassword) {
      return res.status(400).json("Invalid Email or Password.");
    }

    const authToken = existingUser.generateAuthToken("5d");
    res
      .header("x-authentication", authToken)
      .send(_.pick(existingUser, ["_id", "name", "email", "emailVerified", "orgLink"]));
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
