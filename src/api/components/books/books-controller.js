const booksService = require('./books-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getBooks(request, response, next) {
  try {
    const books = await booksService.getBooks();

    return response.status(200).json(books);
  } catch (error) {
    return next(error);
  }
}

async function createBook(request, response, next) {
  try {
    const { title } = request.body;

    if (!title) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Title is required');
    }

    const book = await booksService.create(title);

    return response.status(200).json(book);
  } catch (error) {
    return next(error);
  }
}

async function getBook(request, response, next) {
  try {
    const book = await booksService.getUser(request.params.id);

    if (!book) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    return response.status(200).json(book);
  } catch (error) {
    return next(error);
  }
}

async function updateBook(request, response, next) {
  try {
    const { title } = request.body;

    // User must exist
    const user = await booksService.getUser(request.params.id);
    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    // Email is required and cannot be empty
    if (!title) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Title is required');
    }

    // // Email must be unique, if it is changed
    // if (email !== user.email && (await usersService.emailExists(email))) {
    //   throw errorResponder(
    //     errorTypes.EMAIL_ALREADY_TAKEN,
    //     'Email already exists'
    //   );
    // }

    const success = await booksService.updateUser(request.params.id, title);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update book'
      );
    }

    return response.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function deleteBook(request, response, next) {
  try {
    const success = await booksService.deleteUser(request.params.id);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete book'
      );
    }

    return response.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
};
