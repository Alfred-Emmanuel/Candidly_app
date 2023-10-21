const express = require("express");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const router = express.Router();
const { sendVerificationEmail } = require("../utils/sendVerficationMail");
const { User, validateUser } = require("../models/user");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -emailVerified -verificationToken -date"
  );
  res.send(user);
});

router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const user = new User(_.pick(req.body, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const verificationToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    user.verificationToken = verificationToken;

    sendVerificationEmail(user.email, verificationToken);

    await user.save();

    let responseMessage =
      "Registration successful.  Please check your email for verification instructions.";

    responseMessage = responseMessage;
    res.send({
      message: responseMessage,
      user: _.pick(user, ["_id", "name", "email"]),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
