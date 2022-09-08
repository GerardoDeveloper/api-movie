const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'mysql', // Definimos a que base de datos nos vamos a conectar.
  // logging: true, // Cada vez que se haga una consulta por el ORM, se imprimirá su equivalente de SQL en la consola. NOTA: Esto arroja la siguiente excepción '[SEQUELIZE0002] DeprecationWarning'
  logging: console.log
});

// Creamos el modelo.
setupModels(sequelize);

/**
 * Hacemos una sincronización, es decir, sequelize va a agarrar los modelos y va a crear esas estructuras.
 */
sequelize.sync();

module.exports = sequelize;