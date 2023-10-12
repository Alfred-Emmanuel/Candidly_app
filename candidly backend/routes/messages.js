const express = require("express");
const router = express.Router();
const { Message, validateMessage } = require("../models/message");
const {
  Conversation,
  validateConversation,
} = require("../models/conversation");

router.get("/", async (req, res) => {
  const Message = await Conversation.find();
  res.send(Message);
});

router.post("/send-message", async (req, res) => {
  let { senderId, receiverId, content } = req.body;

  if (!senderId || !receiverId || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      const newConversation = new Conversation({
        participants: [senderId, receiverId],
        messages: [],
        timestampOfLastMessage: Date.now(),
      });

      const newMessage = new Message({
        sender: senderId,
        receiver: receiverId,
        content: content,
      });

      newConversation.messages.push(newMessage);
      await Promise.all([newMessage.save(), newConversation.save()]);
    } else {
      const newMessage = new Message({
        sender: senderId,
        receiver: receiverId,
        content: content,
      });

      conversation.messages.push(newMessage);
      conversation.timestampOfLastMessage = Date.now();
      await Promise.all([newMessage.save(), conversation.save()]);
    }

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


module.exports = router;
