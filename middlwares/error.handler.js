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
 * Capture errors from the ORM Sequelize.
 * @param {*} error The error.
 * @param {*} request Customer consultation or request.
 * @param {*} response Customer response.
 * @param {*} next Next function to be executed.
 */
function ormErrorHandler(error, request, response, next) {
  /**
   * We validate yes the error comes from Sequelize with 'Validationerror'
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
