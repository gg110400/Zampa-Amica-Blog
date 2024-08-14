import express from 'express';
import { 
  getAllEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent, 
  registerForEvent,
  unregisterFromEvent,
  getEventParticipants
} from '../controllers/eventController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js'; // Importa il middleware per l'amministratore
import upload from '../config/multerConfig.js';

const router = express.Router();

// Rotta per creare un nuovo evento (solo per admin)
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), createEvent);

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), updateEvent);
router.delete('/:id', authMiddleware, adminMiddleware, deleteEvent);
router.post('/:id/register', authMiddleware, registerForEvent);
router.post('/:id/unregister', authMiddleware, unregisterFromEvent);
router.get('/:id/participants', authMiddleware, getEventParticipants); 

export default router;