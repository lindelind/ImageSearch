
const Joi = require("joi");


const favoriteSchema = Joi.object({
  title: Joi.string().required(),
  byteSize: Joi.number().required(),
  url: Joi.string().uri().required(),
});


module.exports = favoriteSchema;