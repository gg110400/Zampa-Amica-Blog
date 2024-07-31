// middleware/errorHandler.js

import AppError from '../utils/errorTypes.js';

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err.name,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
  }

  // Gestione degli errori non previsti
  const unknownError = new AppError('An unexpected error occurred', 500);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
    error: unknownError.name,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
};

export default errorHandler;