const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class SerieService {
  constructor() {

  }

  async create(data) {
    const newSerie = await models.Serie.create(data);

    return newSerie;
  }

  async addActor(data) {
    const newActor = await models.ActorHasSerie.create(data);

    return newActor;
  }

  async find() {
    const options = {
      include: ['director']
    }

    const result = await models.Serie.findAll(options);

    return result;
  }

  async findOne(id) {
    const serie = await models.Serie.findByPk(id);

    if (!serie) {
      throw boom.notFound('serie not found');
    }

    return serie;
  }

  async update(id, changes) {

    /**
     * In order not to repeat code, we only call the 'Findone' method and he will do the work of returning the serie if he is found.
     */
    const serie = await this.findOne(id);
    const result = await serie.update(changes);

    return result;
  }

  async delete(id) {
    const serie = await this.findOne(id);
    await serie.destroy();

    return { id };
  }
}

module.exports = SerieService;
