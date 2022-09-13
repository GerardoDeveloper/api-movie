const { Model, DataTypes } = require('sequelize');
const { SERIE_TABLE } = require('./serie.model');

const SEANSON_TABLE = 'seansons';

const SeansonSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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

class Seanson extends Model {

  static associate(models) {
    this.belongsTo(models.Serie, { as: 'serie' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SEANSON_TABLE,
      modelName: 'Seanson',
      timestamps: false
    }
  }
}


module.exports = { SEANSON_TABLE, SeansonSchema, Seanson }