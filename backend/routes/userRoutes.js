import express from 'express';
import passport from 'passport';
import { generateToken } from '../utils/authUtils.js';
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rotte esistenti
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.delete('/', authMiddleware, deleteUser);

// Rotte per l'autenticazione Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}`);
  });

export default router;