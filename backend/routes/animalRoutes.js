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
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllAnimals);
router.get('/search', searchAnimals);
router.get('/:id', getAnimalById);

// Protected routes
router.post('/', authMiddleware, upload.single('image'), createAnimal);
router.put('/:id', authMiddleware, upload.single('image'), updateAnimal);
router.delete('/:id', authMiddleware, deleteAnimal);

export default router;