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
import { storage } from '../config/cloudinary.js';
import multer from 'multer';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

// Configura multer con lo storage di Cloudinary
const upload = multer({ storage: storage });

// Public routes
router.get('/', getAllAnimals);
router.get('/search', searchAnimals);
router.get('/:id', getAnimalById);

// Protected routes
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), createAnimal);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), updateAnimal);
router.delete('/:id', authMiddleware, adminMiddleware, deleteAnimal);

export default router;