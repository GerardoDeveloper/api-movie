const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(60);
const directorId = Joi.number().integer();

const actorId = Joi.number().integer();
const serieId = Joi.number().integer();

// Vaidate for POST
const createSerieSchema = Joi.object({
  name: name.required(),
  directorId: directorId.required()
});

// Add actors to serie
const createActorSchema = Joi.object({
  actorId: actorId.required(),
  serieId: serieId.required()
});

// Validate for PUT
const updateSerieSchema = Joi.object({
  name: name.required(),
  directorId: directorId.required()
});

// Validate for PATCH
const updatePartialSerieSchema = Joi.object({
  name: name,
  directorId: directorId
});

// Validate params
const getSerieSchema = Joi.object({
  id: id.required(),
});

module.exports = { createSerieSchema, createActorSchema, updateSerieSchema, updatePartialSerieSchema, getSerieSchema }
