const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class UserService {

  constructor() {

  }

  /**
   * Create a new user.
   * @param {*} data
   * @returns
   */
  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });

    delete newUser.dataValues.password;

    return newUser;
  }

  /**
   * Create a new user.
   * @returns
   */
  async find() {
    const result = await models.User.findAll();

    return result;
  }

  /**
   * Make the search by email.
   * @param {*} email
   * @returns
   */
  async findByEmail(email) {
    const conditions = {
      where: { email }
    };

    const result = await models.User.findOne(conditions);

    return result;
  }

  /**
   * Search for a specific user. Yes it is not found, a boom error returns.
   * @param {*} id
   * @returns
   */
  async findOne(id) {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw boom.notFound('user not found');
    }

    return user;
  }

  /**
   * Update a user.
   * @param {*} id Number id of user.
   * @param {*} changes Data of user.
   * @returns
   */
  async update(id, changes) {
    const user = await this.findOne(id);
    const result = await user.update(changes);

    return result;
  }

  /**
   * Eliminate a user.
   * @param {*} id
   * @returns
   */
  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    
    return { id };
  }
}

module.exports = UserService;