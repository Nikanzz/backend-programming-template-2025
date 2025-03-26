const express = require('express');
const authController = require('./auth-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/api/authentication', route);

  route.post('/login', authController.login);
};
