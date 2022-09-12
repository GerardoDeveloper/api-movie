const express = require('express');

// Import routers
const moviesRouter = require('./movie.router');
const directorsRouter = require('./director.router');
const actorsRouter = require('./actor.router');
const seriesRouter = require('./serie.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/movies', moviesRouter);
  router.use('/directors', directorsRouter);
  router.use('/actors', actorsRouter);
  router.use('/series', seriesRouter);
}

module.exports = routerApi;
