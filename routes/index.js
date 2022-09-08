const express = require('express');

const moviesRouter = require('./movie.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/movies', moviesRouter);
}

module.exports = routerApi;
