import express from 'express';
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent, registerForEvent } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.post('/:id/register', registerForEvent);

export default router;