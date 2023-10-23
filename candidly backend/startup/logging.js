const { MongoClient } = require("mongodb");
const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console({
      format: winston.format.simple(),
      level: "info",
    }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", ex => {
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));

  const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/candidly", {
    useUnifiedTopology: true, // Add this option
  });

  mongoClient.connect();

  winston.add(
    new winston.transports.MongoDB({
      db: mongoClient.db(),
      level: "info",
    })
  );
};
