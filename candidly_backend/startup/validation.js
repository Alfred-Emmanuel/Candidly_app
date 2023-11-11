const Joi = require("joi");

module.exports = function () {
  const JoiObjectId = require("joi-objectid")(Joi);
  Joi.objectId = JoiObjectId;
};
