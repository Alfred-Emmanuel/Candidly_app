const express = require("express");
const error = require("../middleware/error");
const users = require("../routes/users");
const auth = require("../routes/auth");
const verify = require("../routes/verify");
// const reset_password = require("../routes/reset_password");
const messages = require("../routes/messages");
// const conversations = require("../routes/conversations");
module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/verify", verify);
  // app.use("/reset_password", reset_password);
  app.use("/api/messages", messages);
  // app.use("/api/conversations", conversations);
  app.use(error);
};
