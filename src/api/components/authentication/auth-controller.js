// const authService = require('./auth-service');
// const { errorResponder, errorTypes } = require('../../../core/errors');
// const { hashPassword } = require('../../../utils/password');

// async function create(request, response, next) {
//   try {
//     const { email, password } = request.body;

//     // Email is required and cannot be empty
//     if (!email) {
//       throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is required');
//     }

//     // Email must be unique
//     if (await authService.emailExists(email)) {
//       throw errorResponder(
//         errorTypes.EMAIL_ALREADY_TAKEN,
//         'Email already exists'
//       );
//     }

//     // The password is at least 8 characters long
//     if (password.length < 8) {
//       throw errorResponder(
//         errorTypes.VALIDATION_ERROR,
//         'Password must be at least 8 characters long'
//       );
//     }

//     // Hash the password before saving it to the database
//     const hashedPassword = await hashPassword(password);

//     // Create the user
//     const success = await authService.create(email, hashedPassword);

//     if (!success) {
//       throw errorResponder(
//         errorTypes.UNPROCESSABLE_ENTITY,
//         'Failed to create user'
//       );
//     }

//     return response.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     return next(error);
//   }
// }

// module.exports = {
//   create,
// };

const authService = require('./auth-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

// Create a new user (Signup)
async function create(request, response, next) {
  try {
    const { email, password } = request.body;

    // Email is required and cannot be empty
    if (!email) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is required');
    }

    // Email must be unique
    if (await authService.emailExists(email)) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email already exists'
      );
    }

    // Password must be at least 8 characters long
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

module.exports = {
  create,
  login,
};
