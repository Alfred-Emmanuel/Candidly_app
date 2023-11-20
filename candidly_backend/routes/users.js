const express = require("express");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const router = express.Router();
const { sendVerificationEmail } = require("../utils/sendVerficationMail");
const { sendResetPasswordEmail } = require("../utils/sendResetPasswordMail");
const { User, validateUser, validatePasswordReset } = require("../models/user");

//To get the current user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -emailVerified -verificationToken -date"
  );
  res.send(user);
});

//To get message link
router.get("/message_link", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -emailVerified -verificationToken -date -name -email -forgotPasswordToken"
  );
  res.send(user);
});

//To register
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

//To receive mail to reset password
router.post("/forgot-password", async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email.toLowerCase() });
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
    try {
      await existingUser.save();
      sendResetPasswordEmail(existingUser.email, verificationToken);

      res.json({
        message: `Please check your email for password reset instructions.`,
      });
    } catch (error) {
      // Handle the error in sending the email
      console.error(error);
      existingUser.forgotPasswordToken = ""; // Clear the token in case of error
      await existingUser.save(); // Save the updated user

      res.status(500).json({
        error:
          "An error occurred while sending the email. Please try again later.",
      });
    }
  }
});


//To reset password
router.put("/reset_password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decodedToken.email });

    if (Date.now() >= decodedToken.exp * 1000) {
      return res.status(400).json({ error: "Token has expired" });
    } else if (!user) {
      return res.status(400).json({ error: "User not found" });
    } else if (user.forgotPasswordToken !== token) {
      return res.status(400).json({ error: "Invalid or Used token" });
    } else {
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
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid or expired token, make a new password reset request" });
  }
});

module.exports = router;
