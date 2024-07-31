import express from 'express';
import { submitContactForm, getAllContacts, updateContactStatus } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', submitContactForm);
router.get('/', getAllContacts);
router.put('/:id/status', updateContactStatus);

export default router;