// const express = require("express");
// const _ = require("lodash");
// const router = express.Router();
// const { Conversation } = require("../models/conversation");

// router.get("/:conversationId", async (req, res) => {
//   try {
//     const { conversationId } = req.params;
//     const { userType, userId } = req.user;
//     const conversation = await Conversation.findById(conversationId).populate({
//       path: "messages",
//       select: "content timestamp",
//     });

//     if (!conversation) {
//       return res.status(404).json({ error: "Conversation not found" });
//     }

//     const isParticipant = conversation.participants.includes(userId);

//     const formattedConversation = _.pick(conversation, [
//       "_id",
//       "participants",
//       "timestampOfLastMessage",
//     ]);

//     formattedConversation.messages = conversation.messages.map(message =>
//       _.pick(message, ["content", "timestamp"])
//     );

//     return res.status(200).json({ conversation: formattedConversation });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
