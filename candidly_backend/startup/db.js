const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  // mongoose
  //   .connect("mongodb://localhost:27017/candidly")
  mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => winston.info("Connected to MongoDB..."))
};
