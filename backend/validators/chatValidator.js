const Joi = require("joi");

const chatSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 3 characters",
    "string.max": "First name must be no more than 20 characters",
  }),
  lastName: Joi.string().min(3).max(20).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 3 characters",
    "string.max": "Last name must be no more than 20 characters",
  }),
});

module.exports = chatSchema;
