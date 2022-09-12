const { Model, DataTypes } = require('sequelize');

const ACTOR_TABLE = 'actors';

const ActorSchema = {
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

class Actor extends Model {

  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ACTOR_TABLE,
      modelName: 'Actor',
      timestamps: false
    }
  }
}


module.exports = { ACTOR_TABLE, ActorSchema, Actor }