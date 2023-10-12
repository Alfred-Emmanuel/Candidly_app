const mongoose = require("mongoose");
const Joi = require("joi");
const { userSchema } = require("./user");
const conversationSchema = require("./conversation").conversationSchema;

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming reference to the User collection
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming reference to the User collection
    required: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1024,
    trim: true,
  },
  //   parentMessage: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Message",
  //   },
  image: {
    type: String,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

function validateMessage(message) {
  const schema = Joi.object({
    senderId: Joi.objectId().required(),
    receiverId: Joi.objectId().required(),
    content: Joi.string().min(0).max(1024).required(),
    // parentMessageId: Joi.objectId().required(),
    image: Joi.string().uri(),
  });

  return schema.validate(message);
}

module.exports.Message = Message;
module.exports.messageSchema = messageSchema;
module.exports.validateMessage = validateMessage;
