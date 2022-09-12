const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(60);
const direction = Joi.string().max(50);
const telephone = Joi.string().max(15);

// Vaidate for POST
const createActorSchema = Joi.object({
  name: name.required(),
  direction: direction.required(),
  telephone: telephone.required()
});

// Validate for PUT
const updateActorSchema = Joi.object({
  name: name.required(),
  direction: direction.required(),
  telephone: telephone.required()
});

// Validate for PATCH
const updatePartialActorSchema = Joi.object({
  name,
  direction,
  telephone
});

// Validate params
const getActorSchema = Joi.object({
  id: id.required(),
});

module.exports = { createActorSchema, updateActorSchema, updatePartialActorSchema, getActorSchema }
