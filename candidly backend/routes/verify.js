const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require("../models/user");

router.get("/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(400).json({ error: "Invalid token" });
    }

    // Check if user is already verified
    if (user.emailVerified) {
      return res.status(400).json({ error: "Email already verified" });
    }

    // Mark user as verified
    user.emailVerified = true;
    user.verificationToken = "";

    await user.save();

    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.header("x-authentication",  authToken);

    // Send a response with any additional data
    res.status(200).json({
      message: "Email verified successfully",
      authToken: authToken,
    });
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
});

module.exports = router;
