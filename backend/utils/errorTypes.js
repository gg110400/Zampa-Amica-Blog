// utils/errorTypes.js

class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export const BadRequestError = (message) => new AppError(message, 400);
  export const UnauthorizedError = (message) => new AppError(message || 'Unauthorized access', 401);
  export const ForbiddenError = (message) => new AppError(message || 'Forbidden access', 403);
  export const NotFoundError = (message) => new AppError(message || 'Resource not found', 404);
  export const ConflictError = (message) => new AppError(message, 409);
  export const ValidationError = (message) => new AppError(message, 422);
  export const InternalServerError = (message) => new AppError(message || 'Internal server error', 500);
  
  export const DatabaseError = (message) => {
    const error = new AppError(message || 'Database operation failed', 500);
    error.name = 'DatabaseError';
    return error;
  };
  
  export const NetworkError = (message) => {
    const error = new AppError(message || 'Network operation failed', 500);
    error.name = 'NetworkError';
    return error;
  };
  
  export default AppError;