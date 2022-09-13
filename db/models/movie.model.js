const { Model, DataTypes } = require('sequelize');
const { DIRECTOR_TABLE } = require('./director.model');

const MOVIE_TABLE = 'movies';

const MovieSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  premiereYear: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'premiere_year',
  },
  gender: {
    allowNull: false,
    type: DataTypes.STRING
  },
  directorId: {
    field: 'director_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: DIRECTOR_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  }
}

class Movie extends Model {

  static associate(models) {
    this.belongsTo(models.Director, { as: 'director' });
    this.belongsToMany(models.Actor, {
      as: 'actors',
      through: models.ActorHasMovie,
      foreignKey: 'actorId',
      otherKey: 'movieId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIE_TABLE,
      modelName: 'Movie',
      timestamps: false
    }
  }
}


module.exports = { MOVIE_TABLE, MovieSchema, Movie }