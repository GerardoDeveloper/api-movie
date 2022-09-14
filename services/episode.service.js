const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class SerieService {
  constructor() {

  }

  async create(data) {
    const newEpisode = await models.Episode.create(data);

    return newEpisode;
  }

  async find() {
    const options = {
      include: [
        {
          association: 'seanson',
          include: ['serie']
        },
        'director'
      ]
    }

    const result = await models.Episode.findAll(options);

    return result;
  }

  async findOne(id) {
    const episode = await models.Episode.findByPk(id);

    if (!episode) {
      throw boom.notFound('episode not found');
    }

    return episode;
  }

  async update(id, changes) {

    /**
     * In order not to repeat code, we only call the 'Findone' method and he will do the work of returning the episode if he is found.
     */
    const episode = await this.findOne(id);
    const result = await episode.update(changes);

    return result;
  }

  async delete(id) {
    const episode = await this.findOne(id);
    await episode.destroy();

    return { id };
  }
}

module.exports = SerieService;
