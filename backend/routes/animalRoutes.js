import express from 'express';
import {
   createAnimal,
   getAllAnimals,
   getAnimalById,
   updateAnimal,
   deleteAnimal,
   searchAnimals
} from '../controllers/animalController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../config/multerConfig.js';
import adminMiddleware from '../middleware/adminMiddleware.js'
const router = express.Router();

// Public routes
router.get('/', getAllAnimals);
router.get('/search', searchAnimals);
router.get('/:id', getAnimalById);

// Protected routes
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), createAnimal);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), updateAnimal);
router.delete('/:id', authMiddleware, adminMiddleware, deleteAnimal);

export default router;