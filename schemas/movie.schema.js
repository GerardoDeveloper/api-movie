const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const premiereYear = Joi.number().integer();
const gender = Joi.string();
const iddirector = Joi.number().integer();

const createMovieSchema = Joi.object({
  name: name.required(),
  premiereYear: premiereYear.required(),
  gender: gender.required(),
  iddirector: iddirector.required(),
});

const updateMovieSchema = Joi.object({
  name: name.required(),
  premiereYear: premiereYear.required(),
  gender: gender.required(),
  iddirector: iddirector.required(),
});

const getMovieSchema = Joi.object({
  id: id.required(),
});

module.exports = { createMovieSchema, updateMovieSchema, getMovieSchema }
