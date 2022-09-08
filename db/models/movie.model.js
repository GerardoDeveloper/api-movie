const { Model, DataTypes } = require('sequelize');

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
  iddirector: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'id_director'
  }
}

class Movie extends Model {

  static associate() {

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