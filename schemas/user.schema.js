const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().max(50);
const role = Joi.string().max(50);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const updateUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const updatePartialUserSchema = Joi.object({
  email,
  password,
  role
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, updatePartialUserSchema, getUserSchema }
