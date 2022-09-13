const express = require('express');

const SeansonService = require('./../services/seanson.service');
const statusCode = require('../helper/statusCode');
const { createSeansonSchema, updateSeansonSchema, updatePartialSeansonSchema, getSeansonSchema } = require('./../schemas/seanson.schema');
const validatorHandler = require('../middlwares/validator.handler');

const router = express.Router();
const service = new SeansonService();

router.get('/', async (req, res, next) => {
  try {
    const seanson = await service.find();

    res.json(seanson);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getSeansonSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const seanson = await service.findOne(id);

      res.json(seanson);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', validatorHandler(createSeansonSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSeanson = await service.create(body);

      res.status(statusCode.Created).json(newSeanson);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id', validatorHandler(getSeansonSchema, 'params'), validatorHandler(updateSeansonSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const seanson = await service.update(id, body);

      res.json(seanson);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', validatorHandler(getSeansonSchema, 'params'), validatorHandler(updatePartialSeansonSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const seanson = await service.update(id, body);

      res.json(seanson);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', validatorHandler(getSeansonSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const idDeleted = await service.delete(id);

      res.status(statusCode.OK).json(idDeleted);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
