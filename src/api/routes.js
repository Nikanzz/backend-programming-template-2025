const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const auth = require('./components/authentication/auth-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  auth(app);

  return app;
};
