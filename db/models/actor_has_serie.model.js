const { Model, DataTypes } = require('sequelize');

const { ACTOR_TABLE } = require('./actor.model');
const { SERIE_TABLE } = require('./serie.model');

const ACTOR_HAS_SERIE_TABLE = 'actors_has_series';

const ActorHasSerieSchema = {
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
  serieId: {
    field: 'serie_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: SERIE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  }
}

class ActorHasSerie extends Model {

  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ACTOR_HAS_SERIE_TABLE,
      modelName: 'ActorHasSerie',
      timestamps: false
    }
  }
}

module.exports = { ActorHasSerie, ActorHasSerieSchema, ACTOR_HAS_SERIE_TABLE };