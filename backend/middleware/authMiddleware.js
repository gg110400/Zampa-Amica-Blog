import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { UnauthorizedError } from '../utils/errorTypes.js';

const authMiddleware = async (req, res, next) => {
  try {
    // Estrai il token dall'intestazione Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedError('Nessun token fornito');
    }
    
    let decoded;
    try {
      // Verifica il token
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        // Il token è scaduto, genera un nuovo token
        decoded = jwt.decode(token);
        if (decoded && decoded.user && decoded.user.id) {
          const user = await User.findById(decoded.user.id);
          if (!user) {
            throw new UnauthorizedError('Utente non trovato');
          }

          // Genera un nuovo token
          const newToken = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Imposta il tempo di scadenza desiderato
          });

          // Opzionalmente, imposta il nuovo token nelle intestazioni della risposta o invialo nel corpo della risposta
          res.set('Authorization', `Bearer ${newToken}`);

          // Imposta req.user e continua
          req.user = user;
          return next();
        } else {
          throw new UnauthorizedError('Token non valido');
        }
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError('Token non valido');
      } else {
        throw error;
      }
    }

    // Cerca l'utente nel database usando l'ID dal token decodificato
    const user = await User.findById(decoded.user.id);
    if (!user) {
      throw new UnauthorizedError('Utente non trovato o token non valido');
    }

    // Imposta l'utente su req.user e passa al middleware successivo
    req.user = user;
    next();
  } catch (error) {
    // Gestione degli errori
    next(error);
  }
};

export default authMiddleware;
