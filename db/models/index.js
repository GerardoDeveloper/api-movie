/**
 * Este archivo se encarga de envíar la conexión hacia los modelos,
 * con esto sequelize podrá hacer el mapeo y serialización de datos.
 */

const { Movie, MovieSchema } = require('./movie.model');
const { Director, DirectorSchema } = require('./director.model');

// Configura los modelos.
const setupModels = (sequelize) => {
  Movie.init(MovieSchema, Movie.config(sequelize));
  Director.init(DirectorSchema, Director.config(sequelize));

  Movie.associate(sequelize.models);
  Director.associate(sequelize.models);
};

module.exports = setupModels;