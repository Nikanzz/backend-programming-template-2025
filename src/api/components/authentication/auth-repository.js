const { Login } = require('../../../models');

async function create(email, password) {
  return Login.create({ email, password });
}

async function getUserByEmail(email) {
  return Login.findOne({ email });
}

async function getUsers(offset = 0, limit = 10) {
  return Login.find().skip(offset).limit(limit);
}

module.exports = {
  create,
  getUserByEmail,
  getUsers,
};
