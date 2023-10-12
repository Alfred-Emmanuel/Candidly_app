const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, validateUser } = require("../models/user");

router.get("/", async (req, res) => {
  const user = await User.find().select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  // Validate the request body
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.userType === "organization") {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).send("Email already exists");
  }

  const user = new User(
    _.pick(req.body, ["name", "email", "password", "userType"])
  );

  if (req.body.userType === "organization") {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  await user.save();

  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
