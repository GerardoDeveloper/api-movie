const express = require('express');

const DirectorService = require('../services/director.service');
const statusCode = require('../helper/statusCode');
const { createDirectorSchema, updateDirectorSchema, updatePartialDirectorSchema, getDirectorSchema } = require('./../schemas/director.schema');
const validatorHandler = require('../middlwares/validator.handler');

const router = express.Router();
const service = new DirectorService();

router.get('/', async (request, response, next) => {
  try {
    const director = await service.find();

    response.json(director);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getDirectorSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const director = await service.findOne(id);

      response.json(director);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', validatorHandler(createDirectorSchema, 'body'),
  async (request, response, next) => {
    try {
      const body = request.body;
      const newDirector = await service.create(body);

      response.status(statusCode.Created).json(newDirector);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id', validatorHandler(getDirectorSchema, 'params'), validatorHandler(updateDirectorSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const director = await service.update(id, body);

      response.json(director);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', validatorHandler(getDirectorSchema, 'params'), validatorHandler(updatePartialDirectorSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const director = await service.update(id, body);

      response.json(director);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', validatorHandler(getDirectorSchema, 'params'),
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
