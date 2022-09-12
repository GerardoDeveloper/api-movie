const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const premiereYear = Joi.number().integer();
const gender = Joi.string();
const directorId = Joi.number().integer();

// Validate for POST
const createMovieSchema = Joi.object({
  name: name.required(),
  premiereYear: premiereYear.required(),
  gender: gender.required(),
  directorId: directorId.required(),
});

// Validate for PUT
const updateMovieSchema = Joi.object({
  name: name.required(),
  premiereYear: premiereYear.required(),
  gender: gender.required(),
  directorId: directorId.required(),
});

// Validate for PATCH
const updatePartialMovieSchema = Joi.object({
  name: name,
  premiereYear: premiereYear,
  gender: gender,
  directorId: directorId,
});

const getMovieSchema = Joi.object({
  id: id.required(),
});

module.exports = { createMovieSchema, updateMovieSchema, updatePartialMovieSchema, getMovieSchema }
