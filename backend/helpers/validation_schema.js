const Joi = require("joi");

const authSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required(),
  phoneNumber: Joi.string().min(10).max(10).required(),
});

const authLogin = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required(),
});

module.exports = {
  authSchema,
  authLogin,
};
