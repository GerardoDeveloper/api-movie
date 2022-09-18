const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const premiereYear = Joi.number().integer();
const gender = Joi.string();
const directorId = Joi.number().integer();

// Fields table pivote
const actorId = Joi.number().integer();
const movieId = Joi.number().integer();

// filtering field
const orderBy = Joi.string();

// Validate for POST
const createMovieSchema = Joi.object({
  name: name.required(),
  premiereYear: premiereYear.required(),
  gender: gender.required(),
  directorId: directorId.required(),
});

// Add actors to movie
const createActorSchema = Joi.object({
  actorId: actorId.required(),
  movieId: movieId.required()
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

const queryParamsMovieSchema = Joi.object({
  orderBy
});

module.exports = { createMovieSchema, createActorSchema, updateMovieSchema, updatePartialMovieSchema, getMovieSchema, queryParamsMovieSchema }
