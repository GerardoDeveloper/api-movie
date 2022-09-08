const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(60);
const direction = Joi.string().max(50);
const telephone = Joi.string().max(15);

// Vaidate for POST
const createDirectorSchema = Joi.object({
  name: name.required(),
  direction: direction.required(),
  telephone: telephone.required()
});

// Validate for PUT
const updateDirectorSchema = Joi.object({
  name: name.required(),
  direction: direction.required(),
  telephone: telephone.required()
});

// Validate for PATCH
const updatePartialDirectorSchema = Joi.object({
  name: name,
  direction: direction,
  telephone: telephone
});

// Validate params
const getDirectorSchema = Joi.object({
  id: id.required(),
});

module.exports = { createDirectorSchema, updateDirectorSchema, updatePartialDirectorSchema, getDirectorSchema }
