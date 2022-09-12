const express = require('express');

const ActorService = require('../services/actor.service');
const statusCode = require('../helper/statusCode');
const { createActorSchema, updateActorSchema, updatePartialActorSchema, getActorSchema } = require('./../schemas/actor.schema');
const validatorHandler = require('../middlwares/validator.handler');

const router = express.Router();
const service = new ActorService();

router.get('/', async (request, response, next) => {
  try {
    const actor = await service.find();

    response.json(actor);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getActorSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const actor = await service.findOne(id);

      response.json(actor);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', validatorHandler(createActorSchema, 'body'),
  async (request, response, next) => {
    try {
      const body = request.body;
      const newActor = await service.create(body);

      response.status(statusCode.Created).json(newActor);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id', validatorHandler(getActorSchema, 'params'), validatorHandler(updateActorSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const actor = await service.update(id, body);

      response.json(actor);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', validatorHandler(getActorSchema, 'params'), validatorHandler(updatePartialActorSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const actor = await service.update(id, body);

      response.json(actor);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', validatorHandler(getActorSchema, 'params'),
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
