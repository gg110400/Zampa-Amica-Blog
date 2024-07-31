import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errorTypes.js';

const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return next(new UnauthorizedError('No token, authorization denied'));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    next(new UnauthorizedError('Token is not valid'));
  }
};

export default authMiddleware;