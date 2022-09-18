const { Model, DataTypes } = require('sequelize');
const { DIRECTOR_TABLE } = require('./director.model');
const { SEANSON_TABLE } = require('./seanson.model');

const EPISODE_TABLE = 'episodes';

const EpisodeSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(45)
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
  },
  seansonId: {
    field: 'seanson_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: SEANSON_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  }
}

class Episode extends Model {

  static associate(models) {
    this.belongsTo(models.Director, { as: 'director' });
    this.belongsTo(models.Seanson, { as: 'seanson' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EPISODE_TABLE,
      modelName: 'Episode',
      timestamps: false
    }
  }
}


module.exports = { EPISODE_TABLE, EpisodeSchema, Episode }