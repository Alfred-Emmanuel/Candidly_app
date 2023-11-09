const winston = require("winston");
const multer = require("multer");

module.exports = function (err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "file is too large"
      })
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "file exceeds maximum number of files"
      })
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "Invalid file type"
      })
    }
  } else {
    winston.error(err.message, err);
    res.status(500).send("Something broke!");
  }
};
