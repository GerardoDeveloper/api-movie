const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class DirectorService {
  constructor() {

  }

  async create(data) {
    const newDirector = await models.Director.create(data);

    return newDirector;
  }

  async find() {
    const options = {
      include: ['movies']
    }

    const result = await models.Director.findAll(options);

    return result;
  }

  async findOne(id) {
    const director = await models.Director.findByPk(id);

    if (!director) {
      throw boom.notFound('director not found');
    }

    return director;
  }

  async update(id, changes) {

    /**
     * In order not to repeat code, we only call the 'Findone' method and he will do the work of returning the director if he is found.
     */
    const director = await this.findOne(id);
    const result = await director.update(changes);

    return result;
  }

  async delete(id) {
    const director = await this.findOne(id);
    await director.destroy();

    return { id };
  }
}

module.exports = DirectorService;
