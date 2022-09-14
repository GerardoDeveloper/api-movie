const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(45);
const directorId = Joi.number().integer();
const seansonId = Joi.number().integer();

// Vaidate for POST
const createEpisodeSchema = Joi.object({
  name: name.required(),
  directorId: directorId.required(),
  seansonId: seansonId.required()
});

// Validate for PUT
const updateEpisodeSchema = Joi.object({
  name: name.required(),
  directorId: directorId.required(),
  seansonId: seansonId.required()
});

// Validate for PATCH
const updatePartialEpisodeSchema = Joi.object({
  name: name,
  directorId: directorId,
  seansonId: seansonId
});

// Validate params
const getEpisodeSchema = Joi.object({
  id: id.required(),
});

module.exports = { createEpisodeSchema, updateEpisodeSchema, updatePartialEpisodeSchema, getEpisodeSchema }
