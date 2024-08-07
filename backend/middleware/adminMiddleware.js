// Crea un nuovo file, ad esempio middleware/adminMiddleware.js
import { ForbiddenError } from '../utils/errorTypes.js';

const adminMiddleware = (req, res, next) => {
  console.log('User role from header:', req.headers['user-role']);
  if (req.user && (req.user.role === 'Admin' || req.headers['User-Role'] === 'Admin')) {
    next();
  } else {
    next(new ForbiddenError('Accesso negato. Solo gli amministratori possono eseguire questa azione.'));
  }
};

export default adminMiddleware;