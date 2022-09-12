const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ActorService {
  constructor() {

  }

  async create(data) {
    const newActor = await models.Actor.create(data);

    return newActor;
  }

  async find() {

    const result = await models.Actor.findAll();

    return result;
  }

  async findOne(id) {
    const actor = await models.Actor.findByPk(id);

    if (!actor) {
      throw boom.notFound('actor not found');
    }

    return actor;
  }

  async update(id, changes) {

    /**
     * In order not to repeat code, we only call the 'Findone' method and he will do the work of returning the actor if he is found.
     */
    const actor = await this.findOne(id);
    const result = await actor.update(changes);

    return result;
  }

  async delete(id) {
    const actor = await this.findOne(id);
    await actor.destroy();

    return { id };
  }
}

module.exports = ActorService;
