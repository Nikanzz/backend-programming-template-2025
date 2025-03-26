const authService = require('./auth-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function create(request, response, next) {
  try {
    const { email, password } = request.body;

    if (!email) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is required');
    }

    if (await authService.emailExists(email)) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email already exists'
      );
    }

    if (password.length < 8) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password must be at least 8 characters long'
      );
    }

    const success = await authService.create(email, password);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create user'
      );
    }

    return response.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    return next(error);
  }
}

async function login(request, response, next) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Email and password are required'
      );
    }

    const user = await authService.login(email, password);

    return response.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    return next(error);
  }
}

async function getUsers(request, response, next) {
  try {
    const { offset = 0, limit = 10 } = request.query;
    const users = await authService.getUsers(Number(offset), Number(limit));
    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

async function getBooks(request, response, next) {
  try {
    const { offset = 0, limit = 10 } = request.query;
    const books = await authService.getBooks(Number(offset), Number(limit)); // Assuming you have a `getBooks` function in your service
    return response.status(200).json(books);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  create,
  login,
  getUsers,
  getBooks,
};
