const { Model, DataTypes } = require('sequelize');

const DIRECTOR_TABLE = 'directors';

const DirectorSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(60)
  },
  direction: {
    type: DataTypes.STRING(50)
  },
  telephone: {
    allowNull: false,
    type: DataTypes.STRING(15)
  }
}

class Director extends Model {

  static associate(models) {
    this.hasMany(models.Movie, {
      as: 'movies',
      foreignKey: 'director_id' // aquí esta el problema, debe ir 'directorId', es decir, como es tratado en js
    });

    this.hasMany(models.Serie, {
      as: 'series',
      foreignKey: 'director_id'
    });

    this.hasMany(models.Episode, {
      as: 'episodes',
      foreignKey: 'directorId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DIRECTOR_TABLE,
      modelName: 'Director',
      timestamps: false
    }
  }
}


module.exports = { DIRECTOR_TABLE, DirectorSchema, Director }