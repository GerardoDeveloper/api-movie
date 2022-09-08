const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class MovieService {
  constructor() {

  }

  async create(data) {
    const newMovie = await models.Movie.create(data);

    return newMovie;
  }

  async find() {
    const result = await models.Movie.findAll();

    return result;
  }

  async findOne(id) {
    const movie = await models.Movie.findByPk(id);

    if (!movie) {
      throw boom.notFound('movie not found');
    }

    return movie;
  }

  async update(id, changes) {


    /**
     * Para no repetir código, sólo llamamos al método 'findOne' y él hará el trabajo de retornar el movie si es encontrado.
     */
    const movie = await this.findOne(id);
    const result = await movie.update(changes);

    return result;
  }

  async delete(id) {

    /**
     * Para no repetir código, sólo llamamos al método 'findOne' y él hará el trabajo de retornar el movie si es encontrado.
     */
    const movie = await this.findOne(id);
    await movie.destroy();

    return { id };
  }
}

module.exports = MovieService;
