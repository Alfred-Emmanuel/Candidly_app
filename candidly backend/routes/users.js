const express = require("express");
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

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    userType: req.body.userType,
  });

  // Save the user to the database
  const result = await user.save();

  res.send(result);
});

module.exports = router;
