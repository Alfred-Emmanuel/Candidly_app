const mongoose = require("mongoose");
const Joi = require("joi");
const userSchema = require("./user");
const messageSchema = require("./message");

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming reference to the User collection
      required: true,
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message", // Assuming reference to the Message collection
      required: true,
    },
  ],
  timestampOfLastMessage: {
    type: Date,
    default: Date.now,
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

function validateConversation(conversation) {
  const schema = Joi.object({
    participantsId: Joi.array()
      .items(Joi.objectId().required())
      .min(1)
      .max(2)
      .required(),
    messagesId: Joi.array()
      .items(Joi.objectId().required())
      .min(0)
      .max(1024)
      .required(),
  });

  return schema.validate(conversation);
}

module.exports.Conversation = Conversation;
module.exports.conversationSchema = conversationSchema;
module.exports.validateConversation = validateConversation;
