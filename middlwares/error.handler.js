const { ValidationError } = require('sequelize');

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

/**
 * Captura errores provenientes del ORM Sequelize.
 * @param {*} error El error.
 * @param {*} request La consulta o petición del cliente.
 * @param {*} response La respuesta al cliente.
 * @param {*} next Siguiente función a ejecutar.
 */
function ormErrorHandler(error, request, response, next) {
  /**
   * Validamos sí el error viene desde Sequelize con 'ValidationError'
   */
  if (error instanceof ValidationError) {
    response.status(409).json({
      statusCode: 409,
      message: error.name,
      errors: error.errors
    });
  }

  next(error);
}


module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }
