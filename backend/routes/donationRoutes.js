import express from 'express';
import { createDonation, getDonationById, getAllDonations } from '../controllers/donationController.js';
import adminMiddleware from '../middleware/adminMiddleware.js'; // Importato adminMiddleware

const router = express.Router();

router.post('/', createDonation); 
router.get('/:id', adminMiddleware, getDonationById); 
router.get('/', adminMiddleware, getAllDonations); 

export default router;