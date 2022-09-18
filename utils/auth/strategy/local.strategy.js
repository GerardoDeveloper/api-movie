const { Strategy } = require('passport-local');
const AuthService = require('../../../services/auth.service');


const service = new AuthService();

const localStrategy = new Strategy({

  // To rename/customize the variables that are sent from the client.
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, done) => {
    try {

      // The user is obtained.
      const user = await service.getUser(email, password);

      // If all the previous validations were passed, it is because there were no errors.
      done(null, user);
    } catch (error) {
      // If something goes wrong, we executed 'Done' and we sent a false as a parameter, that is, it could not be authenticated.
      done(error, false);
    }
  });

module.exports = localStrategy;