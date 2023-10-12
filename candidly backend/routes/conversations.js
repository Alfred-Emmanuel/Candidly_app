// const express = require("express");
// const router = express.Router();
// const { Conversation } = require("../models/conversation");

// router.get("/:conversationId", async (req, res) => {
//   const { conversationId } = req.params;

//   try {
//     const conversation = await Conversation.findById(conversationId)
//       .populate("participants", "name email") // Populate participants with name and email
//       .populate({
//         path: "messages",
//         populate: {
//           path: "sender",
//           select: "name email", // Select name and email of the sender
//         },
//       });

//     if (!conversation) {
//       return res.status(404).json({ error: "Conversation not found" });
//     }

//     return res.status(200).json({ conversation });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { Conversation } = require("../models/conversation");

router.get("/:conversationId", async (req, res) => {
  const { conversationId } = req.params;

  try {
    const conversation = await Conversation.findById(conversationId).populate({
      path: "messages",
      select: "content timestamp",
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Extracting content and timestamp from messages
    const formattedMessages = conversation.messages.map(message => ({
      content: message.content,
      timestamp: message.timestamp,
    }));

    // Creating a new object with the formatted messages
    const formattedConversation = {
      _id: conversation._id,
      participants: conversation.participants,
      messages: formattedMessages,
      timestampOfLastMessage: conversation.timestampOfLastMessage,
      __v: conversation.__v,
    };

    return res.status(200).json({ conversation: formattedConversation });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;

