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
    const result = await models.Director.findAll();

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
     * Para no repetir código, sólo llamamos al método 'findOne' y él hará el trabajo de retornar el director si es encontrado.
     */
    const director = await this.findOne(id);
    const result = await director.update(changes);

    return result;
  }

  async delete(id) {

    /**
     * Para no repetir código, sólo llamamos al método 'findOne' y él hará el trabajo de retornar el director si es encontrado.
     */
    const director = await this.findOne(id);
    await director.destroy();

    return { id };
  }
}

module.exports = DirectorService;
