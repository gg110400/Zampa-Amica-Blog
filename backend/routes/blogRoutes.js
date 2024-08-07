import express from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost, addComment } from '../controllers/blogController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { storage } from '../config/cloudinary.js';
import multer from 'multer';

const router = express.Router();

// Configura multer con lo storage di Cloudinary
const upload = multer({ storage: storage });

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', authMiddleware, upload.single('image'), createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.post('/:id/comments', authMiddleware, addComment);

export default router;