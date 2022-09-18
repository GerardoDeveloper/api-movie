const boom = require('@hapi/boom');
const { config } = require('../config/config');

/**
 * Check if the apikey is sent in the Header.
 * @param {*} req Request for the petition.
 * @param {*} res Petition response.
 * @param {*} next Next function that will execute the following Middleware.
 */
const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['api'];

  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
};

/**
 * Check the permissions dynamically.
 * @param  {Array} roles Array that will contain the permits.
 * @returns
 */
const checkRoles = (...roles) => {

  return (req, res, next) => {

    // Within the request we are going to have the object 'User' that was previously signed by Passport.
    const user = req.user;

    // Check yes inside the roles array, the user's role is included.
    if (roles.includes(user.role)) {
      next(); // Let it pass.
    } else {
      next(boom.unauthorized()); // Throw an MSJ to the client that is not authorized.
    }
  }
};

module.exports = { checkApiKey, checkRoles }