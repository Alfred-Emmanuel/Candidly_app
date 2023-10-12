const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const app = express();
const users = require("./routes/users");
const messages = require("./routes/messages");
const conversations = require("./routes/conversations");

const JoiObjectId = require("joi-objectid")(Joi);
Joi.objectId = JoiObjectId;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", users);
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
