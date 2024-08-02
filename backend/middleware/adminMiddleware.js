// Crea un nuovo file, ad esempio middleware/adminMiddleware.js
import { ForbiddenError } from '../utils/errorTypes.js';

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    next(new ForbiddenError('Accesso negato. Solo gli amministratori possono eseguire questa azione.'));
  }
};

export default adminMiddleware;