// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const { awsUploadS3Client } = require("../utils/uploadImages");
// const multer = require('multer');
// const { Message, validateMessage } = require("../models/message");
// const { User } = require("../models/user");

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.split("/")[0] === 'image') {
//     cb(null, true);
//   } else {
//     cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
//   }
// };

// const upload = multer({
//   fileFilter: fileFilter,
//   storage: multer.memoryStorage(),
// });

// const multiUpload = upload.fields([{ name: 'imageFile', maxCount: 10}])


// router.get("/my_messages", auth, async (req, res) => {
//   const receiverId = req.user._id;
//   const messages = await Message.find({ receiverId: receiverId });
//   res.json(messages);
// });

// router.post("/send-message/:token", multiUpload, async (req, res) => {
//   const { token } = req.params;
//   let { header, receiverId, content } = req.body;

  // const results = await awsUploadS3Client(req.files.imageFile);

//   if (!receiverId || !content ) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const { error } = validateMessage(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const userExists = await User.findById(token);
//   if (!userExists) {
//     return res.status(400).json({ error: "The receiver does not exist" });
//   }
//   // const imageUrl = await awsUpload({ fileName, imageFile });

//   const newMessage = new Message({
//     // sender: senderId,
//     receiver: receiverId,
//     content: content,
//     header: header
//   });
//   await newMessage.save();

//   return res.status(200).json({ message: "Message sent successfully",  });
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { awsUploadS3Client } = require("../utils/uploadImages");
const multer = require('multer');
const { Message, validateMessage } = require("../models/message");
const { User } = require("../models/user");

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === 'image') {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({
  fileFilter: fileFilter,
  storage: multer.memoryStorage(),
});

const multiUpload = upload.fields([{ name: 'imageFile', maxCount: 10}])

router.get("/my_messages", auth, async (req, res) => {
  const receiverId = req.user._id;
  const messages = await Message.find({ receiverId: receiverId });
  res.json(messages);
});

router.post("/send-message/:token", multiUpload, async (req, res) => {
  const { token } = req.params;
  let { receiverId, content, imageFile } = req.body;

  const results = await awsUploadS3Client(req.files.imageFile);

  if (!receiverId || !content ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { error } = validateMessage(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userExists = await User.findById(receiverId);
  if (!userExists) {
    return res.status(400).json({ error: "The receiver does not exist" });
  }

  const newMessage = new Message({
    // sender: senderId,
    receiver: receiverId,
    content: content,
    header: token,
    images: results,
  });

  await newMessage.save();

  return res.status(200).json({ message: "Message sent successfully" });
});

module.exports = router;