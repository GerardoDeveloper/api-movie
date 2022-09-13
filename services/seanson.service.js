const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class SeansonService {
  constructor() {

  }

  async create(data) {
    const newSeanson = await models.Seanson.create(data);

    return newSeanson;
  }

  async find() {
    const options = {
      include: ['serie']
    }

    const result = await models.Seanson.findAll(options);

    return result;
  }

  async findOne(id) {
    const associations = {
      include: ['serie']
    };

    const seanson = await models.Seanson.findByPk(id, associations);

    if (!seanson) {
      throw boom.notFound('seanson not found');
    }

    return seanson;
  }

  async update(id, changes) {


    /**
     * In order not to repeat code, we only call the 'Findone' method and he will do the work of returning the seanson if he is found.
     */
    const seanson = await this.findOne(id);
    const result = await seanson.update(changes);

    return result;
  }

  async delete(id) {
    const seanson = await this.findOne(id);
    await seanson.destroy();

    return { id };
  }
}

module.exports = SeansonService;
