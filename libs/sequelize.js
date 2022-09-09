const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'mysql', // We define what database we are going to connect.
  logging: console.log // Print a console log of all the requests to debugging.
});

// We create the model.
setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;