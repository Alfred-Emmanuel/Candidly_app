require("dotenv").config();
const express = require("express");
const app = express();
const winston = require("winston");
const {Server} = require("socket.io");
const cors = require("cors");
const { initializeSocket } = require("./startup/socket");

app.use(cors());

// const io = new Server(expressServer, {
//   // cors: {
//   //   origin: "*",
//   //   methods: ["GET", "POST"],
//   // },});

const port = process.env.PORT || 3000;

const expressServer = app.listen(port, () => {
  winston.info(`Listening on port ${port}...`);
});

  require("./startup/logging")();
  initializeSocket(expressServer);
  require ("./startup/routes")(app);
  require("./startup/db")();
  require("./startup/config")();
  require("./startup/validation")();
  require("./startup/prod")(app);


