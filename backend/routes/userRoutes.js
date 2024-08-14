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
import upload from '../config/multerConfig.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.delete('/', authMiddleware, deleteUser);
router.post('/toggle-blog-subscription', authMiddleware, toggleBlogSubscription);
router.post('/update-avatar', authMiddleware, upload.single('avatar'), updateUserAvatar);
router.post('/set-admin', authMiddleware, setAdminRole);


router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = req.user.token;
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
  }
);

export default router;