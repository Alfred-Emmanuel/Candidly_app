const mongoose = require("mongoose");
require("dotenv").config();
const Joi = require("joi");
const express = require("express");
const app = express();
const users = require("./routes/users");
const auth = require("./routes/auth");
const verify = require("./routes/verify");
const messages = require("./routes/messages");
const conversations = require("./routes/conversations");

if (!process.env.JWT_SECRET) {
  throw new Error("One or more required environment variables are not set.");
  // process.exit(1);;
}

const JoiObjectId = require("joi-objectid")(Joi);
Joi.objectId = JoiObjectId;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/verify", verify);
app.use("/api/messages", messages);
app.use("/api/conversations", conversations);

mongoose
  .connect("mongodb://127.0.0.1:27017/candidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
