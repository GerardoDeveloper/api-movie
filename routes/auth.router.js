const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config')
const AuthService = require('../services/auth.service');

const service = new AuthService();
const router = express.Router();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;

      // We sign the payload.
      const data = service.signToken(user);

      // We return the data to the client.
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;