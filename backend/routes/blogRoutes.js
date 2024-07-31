import express from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost, addComment } from '../controllers/blogController.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/comments', addComment);

export default router;