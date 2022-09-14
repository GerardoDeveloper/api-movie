const express = require('express');

const EpisodeService = require('../services/episode.service');
const statusCode = require('../helper/statusCode');
const { createEpisodeSchema, updateEpisodeSchema, updatePartialEpisodeSchema, getEpisodeSchema } = require('./../schemas/episode.schema');
const validatorHandler = require('../middlwares/validator.handler');

const router = express.Router();
const service = new EpisodeService();

router.get('/', async (request, response, next) => {
  try {
    const episode = await service.find();

    response.json(episode);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getEpisodeSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const episode = await service.findOne(id);

      response.json(episode);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', validatorHandler(createEpisodeSchema, 'body'),
  async (request, response, next) => {
    try {
      const body = request.body;
      const newEpisode = await service.create(body);

      response.status(statusCode.Created).json(newEpisode);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id', validatorHandler(getEpisodeSchema, 'params'), validatorHandler(updateEpisodeSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const episode = await service.update(id, body);

      response.json(episode);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', validatorHandler(getEpisodeSchema, 'params'), validatorHandler(updatePartialEpisodeSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const episode = await service.update(id, body);

      response.json(episode);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', validatorHandler(getEpisodeSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const idDeleted = await service.delete(id);

      response.status(statusCode.OK).json(idDeleted);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
