module.exports = (db) =>
  db.model(
    'Login',
    db.Schema({
      email: String,
      password: String,
    })
  );
