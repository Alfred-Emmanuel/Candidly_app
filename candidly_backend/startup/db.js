const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  // mongoose
  //   .connect(process.env.LOCAL_DB)
  mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => winston.info("Connected to MongoDB..."))
};
