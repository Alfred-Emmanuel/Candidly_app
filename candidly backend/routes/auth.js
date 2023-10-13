const express = require("express");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  // Validate the request body
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser.userType === "organization") {
    if (!existingUser)
      return res.status(400).send("Invalid Email or Password.");
    else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        existingUser.password
      );
      if (!validPassword)
        return res.status(400).send("Invalid Email or Password.");
      const token = jwt.sign(
        { _id: existingUser._id },
        process.env.JWT_SECRET
      );
      res.send(token);
    }
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
