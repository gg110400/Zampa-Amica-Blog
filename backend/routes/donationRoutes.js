import express from 'express';
import { createDonation, getDonationById, getAllDonations } from '../controllers/donationController.js';

const router = express.Router();

router.post('/', createDonation);
router.get('/:id', getDonationById);
router.get('/', getAllDonations);

export default router;