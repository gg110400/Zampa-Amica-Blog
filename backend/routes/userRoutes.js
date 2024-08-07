import express from 'express';
import passport from 'passport';
import {
   registerUser,
   loginUser,
   getUserProfile,
   updateUserProfile,
   deleteUser,
   toggleBlogSubscription,
   updateUserAvatar,
   setAdminRole
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { generateToken } from '../utils/authUtils.js';
import { storage } from '../config/cloudinary.js';
import multer from 'multer';

const router = express.Router();

// Configura multer con lo storage di Cloudinary
const upload = multer({ storage: storage });

// Rotte pubbliche
router.post('/register', registerUser);
router.post('/login', loginUser);

// Rotte protette
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.delete('/', authMiddleware, deleteUser);
router.post('/toggle-blog-subscription', authMiddleware, toggleBlogSubscription);
router.post('/update-avatar', authMiddleware, upload.single('avatar'), updateUserAvatar);
router.post('/set-admin', authMiddleware, setAdminRole);



console.log('Route file loaded');

// Inizia l'autenticazione Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback dopo l'autenticazione Google
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  (req, res) => {
    console.log('Autenticazione Google riuscita');
    const token = generateToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
  }
);

export default router;