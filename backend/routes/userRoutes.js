import express from 'express';
import passport from 'passport';
import { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  deleteUser,
  toggleBlogSubscription
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { generateToken } from '../utils/authUtils.js';

const router = express.Router();

// Rotte pubbliche
router.post('/register', registerUser);
router.post('/login', loginUser);

// Rotte protette
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.delete('/', authMiddleware, deleteUser);
router.post('/toggle-blog-subscription', authMiddleware, toggleBlogSubscription);

// Rotte per l'autenticazione Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Assumiamo che req.user sia impostato da Passport dopo un'autenticazione riuscita
    const token = generateToken(req.user);
    
    // Salva il token nel documento utente
    req.user.token = token;
    req.user.save().then(() => {
      // Reindirizza al frontend con il token
      res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}`);
    }).catch(err => {
      console.error('Errore nel salvare il token:', err);
      res.redirect('/login');
    });
  }
);

export default router;