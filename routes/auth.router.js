const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config')

const router = express.Router();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id, // We identify the user by your id.
        role: user.role // We get the roles.
      }

      // We sign the payload.
      const token = jwt.sign(payload, config.jwtSecret);

      // We return the data to the client.
      res.status(200).json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;