const Joi = require("joi");
const { VALIDATORS: V, applyPattern } = require("../../constants/validators");

module.exports.login = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().trim().required(),
});

module.exports.register = Joi.object({
  fullName: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string()
    .trim()
    .lowercase()
    .replace(/\s+/g, "")
    .email()
    .required(),
  password: applyPattern(
    Joi.string().trim().min(6).max(30).required(),
    V.PASSWORD_STRONG
  ),
});
