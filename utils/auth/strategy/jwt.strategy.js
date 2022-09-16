const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');

const options = {
  // We indicate from where the token is going to be sent. It must be sent as 'Bearer' known as (bearer authentication)
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret, // We take out the secret of our environment variables.
}

const JwtStrategy = new Strategy(options, (payload, done) => {

  /**
   * If the token is correctly verified,
   * the 'Payload' internally will return
   * the 'Strategy' class verifies the data
   * and returns the 'payload' with all the data.
   */
  return done(null, payload);
});

module.exports = JwtStrategy;