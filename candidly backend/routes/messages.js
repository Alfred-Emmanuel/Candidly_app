const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Message, validateMessage } = require("../models/message");
const { User } = require("../models/user");

// router.get("/", async (req, res) => {
//   const Message = await Conversation.find();
//   res.send(Message);
// });

router.get("/my_messages", auth, async (req, res) => {
  const receiverId = req.user._id;

    try {
      const messages = await Message.find({ receiverId: receiverId });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  // const message = await Message.findById(req.user._id).select(
  //   "-password -messageType -emailVerified -verificationToken -date"
  // );
  // res.send(message);
});

router.post("/send-message", async (req, res) => {
  let { receiverId, content } = req.body;

  if (!receiverId || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { error } = validateMessage(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {

    const userExists = await User.findById(receiverId);
    if (!userExists) {
      return res.status(400).json({ error: "The receiver does not exist" });
    }

    const newMessage = new Message({
      // sender: senderId,
      receiver: receiverId,
      content: content,
    });

    await newMessage.save();

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
