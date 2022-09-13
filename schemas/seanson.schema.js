const Joi = require('joi');

const id = Joi.number().integer();
const serieId = Joi.number().integer();

// Validate for POST
const createSeansonSchema = Joi.object({
  serieId: serieId.required(),
});

// Validate for PUT
const updateSeansonSchema = Joi.object({
  serieId: serieId.required(),
});

// Validate for PATCH
const updatePartialSeansonSchema = Joi.object({
  serieId
});

const getSeansonSchema = Joi.object({
  id: id.required(),
});

module.exports = { createSeansonSchema, updateSeansonSchema, updatePartialSeansonSchema, getSeansonSchema }
