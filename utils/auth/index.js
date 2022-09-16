const passport = require('passport');

// We import all strategies.
const localStrategy = require('./strategy/local.strategy');
const JwtStrategy = require('./strategy/jwt.strategy');

// We use our strategies.
passport.use(localStrategy);
passport.use(JwtStrategy);