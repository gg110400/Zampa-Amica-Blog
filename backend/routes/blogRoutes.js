import express from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost, addComment } from '../controllers/blogController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js'; // Added adminMiddleware import
import upload from '../config/multerConfig.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), createPost); // Added adminMiddleware
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), updatePost); // Added adminMiddleware
router.delete('/:id', authMiddleware, adminMiddleware, deletePost); // Added adminMiddleware
router.post('/:id/comments', authMiddleware, addComment);

export default router;