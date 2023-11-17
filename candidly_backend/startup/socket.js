// socket.js

const { Server } = require("socket.io");
const winston = require("winston");

let ioInstance;

function initializeSocket(server) {
  ioInstance = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  
ioInstance.on("connection", (socket) => {
  winston.log({
    level: 'info', // or 'debug' or 'error' depending on the severity
    message: "A user connected"
  });

  // Handle disconnects
  socket.on("disconnect", () => {
    winston.log({
      level: 'info', // or 'debug' or 'error' depending on the severity
      message: "A user disconnected"
    });
  });
});

  return ioInstance;
}

function getIo() {
  if (!ioInstance) {
    throw new Error("Socket not initialized");
  }
  return ioInstance;
}

module.exports = { initializeSocket, getIo };
