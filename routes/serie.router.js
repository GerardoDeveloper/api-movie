const express = require('express');

const SerieService = require('../services/serie.service');
const statusCode = require('../helper/statusCode');
const { createSerieSchema, createActorSchema, updateSerieSchema, updatePartialSerieSchema, getSerieSchema } = require('./../schemas/serie.schema');
const validatorHandler = require('../middlwares/validator.handler');

const router = express.Router();
const service = new SerieService();

router.get('/', async (request, response, next) => {
  try {
    const serie = await service.find();

    response.json(serie);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getSerieSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const serie = await service.findOne(id);

      response.json(serie);
    } catch (error) {
      next(error);
    }
  }
);

// Add actors to serie
router.post('/add-actor', validatorHandler(createActorSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newActor = await service.addActor(body);
      res.status(201).json(newActor);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', validatorHandler(createSerieSchema, 'body'),
  async (request, response, next) => {
    try {
      const body = request.body;
      const newSerie = await service.create(body);

      response.status(statusCode.Created).json(newSerie);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id', validatorHandler(getSerieSchema, 'params'), validatorHandler(updateSerieSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const serie = await service.update(id, body);

      response.json(serie);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', validatorHandler(getSerieSchema, 'params'), validatorHandler(updatePartialSerieSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const serie = await service.update(id, body);

      response.json(serie);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', validatorHandler(getSerieSchema, 'params'),
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
