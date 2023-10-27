const express = require("express");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const router = express.Router();
const { sendVerificationEmail } = require("../utils/sendVerficationMail");
const { sendResetPasswordEmail } = require("../utils/sendResetPasswordMail");
const { User, validateUser, validatePasswordReset } = require("../models/user");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -emailVerified -verificationToken -date"
  );
  res.send(user);
});

router.post("/", async (req, res) => {
  // Validate the request body
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(400).json({ error: "Email already exists" });

  const user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const verificationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
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
});

router.post("/forgot-password", async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser)
    return res.status(400).json({ error: "Email doesn't exist" });
  else if (existingUser.emailVerified === false)
    return res.status(400).json({ error: "Email not verified" });
  else if (existingUser.forgotPasswordToken) {
    const decodedToken = jwt.decode(existingUser.forgotPasswordToken);
    if (Date.now() >= decodedToken.exp * 1000) {
      // The previous token has expired, allow the user to request a new one
      existingUser.forgotPasswordToken = ""; // Clear the expired token
    } else {
      return res
        .status(400)
        .json({ error: "Password reset already requested" });
    }
  } else {
    const verificationToken = jwt.sign(
      { email: existingUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    existingUser.forgotPasswordToken = verificationToken;
    await existingUser.save();

    sendResetPasswordEmail(existingUser.email, verificationToken);
    res.json({
      message: `Please check your email for password reset instructions.`,
    });
  }
});

router.put("/reset_password/:token", async (req, res) => {
  const { token } = req.params;
  const { password, email } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const tokenEmail = decodedToken.email;
    const user = await User.findOne({ email: tokenEmail });

    if (Date.now() >= decodedToken.exp * 1000) {
      return res.status(400).json({ error: "Token has expired" });
    }

    if (!user) {
      return res.status(400).json({ error: "Invalid token or user not found" });
    }

    if (email !== tokenEmail) {
      return res.status(400).json({ error: "Email does not match email provided at the request of changing passwords!!" });
    }

    if (!user.forgotPasswordToken) {
      return res.status(400).json({ error: "Token has already been used" });
    }

    const { error } = validatePasswordReset(password);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.forgotPasswordToken = "";

    await user.save();

    return res.json({
      message:
        "Password updated successfully, proceed to login with your new password.",
      password: user.password,
      // password: password,
    });
  } catch (error) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }
});

module.exports = router;
