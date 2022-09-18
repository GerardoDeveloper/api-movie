const UserService = require('./user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

const service = new UserService();

class AuthService {

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
    const data = {
      user,
      token
    }

    return data;
  }

  refreshToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
    const data = { user, token };

    return data;
  }

  async getUser(email, password) {
    const user = await service.findByEmail(email);

    // If the client is not found, we show that it is not authorized.
    if (!user) {
      throw boom.unauthorized();
    }

    // If the user finds, compare the passwords.
    const isMatch = await bcrypt.compare(password, user.password);

    // We validate if it is not authorized. That is, a valid password is not supplied.
    if (!isMatch) {
      throw boom.unauthorized();
    }

    // We remove the password from the User object so that the client is not visualized.
    delete user.dataValues.password;

    return user;
  }
}

module.exports = AuthService;