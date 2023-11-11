require("dotenv").config();
const express = require("express");
const app = express();
const winston = require("winston");
const path = require('path');

require("./startup/logging")();
require ("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
// require("./startup/prod")(app);


app.get("/", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../candidly_frontend/my-app/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err)
      }
    }
  );
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  winston.info(`Listening on port ${port}...`);
});
