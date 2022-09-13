/**
 * Este archivo se encarga de envíar la conexión hacia los modelos,
 * con esto sequelize podrá hacer el mapeo y serialización de datos.
 */

const { Movie, MovieSchema } = require('./movie.model');
const { Director, DirectorSchema } = require('./director.model');
const { Actor, ActorSchema } = require('./actor.model');
const { Serie, SerieSchema } = require('./serie.model');
const { ActorHasMovie, ActorHasMovieSchema } = require('./actor_has_movie.model');
const { ActorHasSerie, ActorHasSerieSchema } = require('./actor_has_serie.model');
const { Seanson, SeansonSchema } = require('./seanson.model');
const { Episode, EpisodeSchema } = require('./episode.model');

// Configura los modelos.
const setupModels = (sequelize) => {
  Movie.init(MovieSchema, Movie.config(sequelize));
  Director.init(DirectorSchema, Director.config(sequelize));
  Actor.init(ActorSchema, Actor.config(sequelize));
  Serie.init(SerieSchema, Serie.config(sequelize));
  ActorHasMovie.init(ActorHasMovieSchema, ActorHasMovie.config(sequelize));
  ActorHasSerie.init(ActorHasSerieSchema, ActorHasSerie.config(sequelize));
  Seanson.init(SeansonSchema, Seanson.config(sequelize));
  Episode.init(EpisodeSchema, Episode.config(sequelize));

  Movie.associate(sequelize.models);
  Director.associate(sequelize.models);
  Actor.associate(sequelize.models);
  Serie.associate(sequelize.models);
  Seanson.associate(sequelize.models);
  Episode.associate(sequelize.models);
};

module.exports = setupModels;