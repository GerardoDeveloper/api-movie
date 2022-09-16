const { Strategy } = require('passport-local');
const UserService = require('../../../services/user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const service = new UserService();

const localStrategy = new Strategy({

  // To rename/customize the variables that are sent from the client.
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);

      // If the client is not found, we show that it is not authorized.
      if (!user) {
        done(boom.unauthorized(), false);
      }

      // If the user finds, compare the passwords.
      const isMatch = await bcrypt.compare(password, user.password);

      // We validate if it is not authorized. That is, a valid password is not supplied.
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }

      // We remove the password from the User object so that the client is not visualized.
      delete user.dataValues.password;

      // If all the previous validations were passed, it is because there were no errors.
      done(null, user);
    } catch (error) {
      // If something goes wrong, we executed 'Done' and we sent a false as a parameter, that is, it could not be authenticated.
      done(error, false);
    }
  });

module.exports = localStrategy;