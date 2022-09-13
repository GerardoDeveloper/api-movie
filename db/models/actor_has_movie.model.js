const { Model, DataTypes } = require('sequelize');

const { ACTOR_TABLE } = require('./actor.model');
const { MOVIE_TABLE } = require('./movie.model');

const ACTOR_HAS_MOVIE_TABLE = 'actors_has_movies';

const ActorHasMovieSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  actorId: {
    field: 'actor_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ACTOR_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  movieId: {
    field: 'movie_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: MOVIE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  }
}

class ActorHasMovie extends Model {

  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ACTOR_HAS_MOVIE_TABLE,
      modelName: 'ActorHasMovie',
      timestamps: false
    }
  }
}

module.exports = { ActorHasMovie, ActorHasMovieSchema, ACTOR_HAS_MOVIE_TABLE };