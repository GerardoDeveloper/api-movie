const boom = require('@hapi/boom');
const sequelize = require('sequelize');
const { models } = require('../libs/sequelize');

class MovieService {
  constructor() {

  }

  async create(data) {
    const newMovie = await models.Movie.create(data);

    return newMovie;
  }

  async addActor(data) {
    const newActor = await models.ActorHasMovie.create(data);

    return newActor;
  }

  async find(query) {
    const options = {
      include: ['director'],
    }

    const { orderBy } = query;

    if (orderBy) {
      options.order = [[orderBy, 'DESC']]
    }

    const result = await models.Movie.findAll(options);

    return result;
  }

  async findOne(id) {
    const associations = {
      include: ['actors']
    };

    const movie = await models.Movie.findByPk(id, associations);

    if (!movie) {
      throw boom.notFound('movie not found');
    }

    return movie;
  }

  async update(id, changes) {


    /**
     * In order not to repeat code, we only call the 'Findone' method and he will do the work of returning the movie if he is found.
     */
    const movie = await this.findOne(id);
    const result = await movie.update(changes);

    return result;
  }

  async delete(id) {
    const movie = await this.findOne(id);
    await movie.destroy();

    return { id };
  }
}

module.exports = MovieService;
