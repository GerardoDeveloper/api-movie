const { Model, DataTypes } = require('sequelize');
const { DIRECTOR_TABLE } = require('./director.model');

const SERIE_TABLE = 'series';

const SerieSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(100)
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

class Serie extends Model {

  static associate(models) {
    this.belongsTo(models.Director, { as: 'director' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SERIE_TABLE,
      modelName: 'Serie',
      timestamps: false
    }
  }
}


module.exports = { SERIE_TABLE, SerieSchema, Serie }