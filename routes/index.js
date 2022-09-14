const express = require('express');

// Import routers
const moviesRouter = require('./movie.router');
const directorsRouter = require('./director.router');
const actorsRouter = require('./actor.router');
const seriesRouter = require('./serie.router');
const seansonRouter = require('./seanson.router');
const episodeRouter = require('./episode.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/movies', moviesRouter);
  router.use('/directors', directorsRouter);
  router.use('/actors', actorsRouter);
  router.use('/series', seriesRouter);
  router.use('/seansons', seansonRouter);
  router.use('/episodes', episodeRouter);
}

module.exports = routerApi;
