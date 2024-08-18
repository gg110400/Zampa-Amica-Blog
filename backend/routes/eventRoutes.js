import express from 'express';
import {
   createEvent,
   getAllEvents,
   getEventById,
   updateEvent,
   deleteEvent
} from '../controllers/eventController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../config/multerConfig.js';
import adminMiddleware from '../middleware/adminMiddleware.js'
const router = express.Router();

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Protected routes
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), createEvent);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), updateEvent);
router.delete('/:id', authMiddleware, adminMiddleware, deleteEvent);

export default router;