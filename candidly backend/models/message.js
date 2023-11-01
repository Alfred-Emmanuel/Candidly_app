const mongoose = require("mongoose");
const Joi = require("joi");

const messageSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming reference to the User collection
    required: true,
  },
  header: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1024,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10024,
    trim: true,
  },
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
    // senderId: Joi.objectId().required(),
    receiverId: Joi.objectId().required(),
    content: Joi.string().min(1).max(10024).required(),
    header: Joi.string().min(1).max(1024).required(),
    // parentMessageId: Joi.objectId().required(),
    image: Joi.string().uri(),
  });

  return schema.validate(message);
}

module.exports.Message = Message;
module.exports.messageSchema = messageSchema;
module.exports.validateMessage = validateMessage;
