const { Model, DataTypes } = require('sequelize');

const MOVIE_TABLE = 'directors';

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

  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIE_TABLE,
      modelName: 'Director',
      timestamps: false
    }
  }
}


module.exports = { MOVIE_TABLE, DirectorSchema, Director }