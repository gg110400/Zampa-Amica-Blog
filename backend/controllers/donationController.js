import Donation from '../models/Donation.js';
import User from '../models/User.js';
import { BadRequestError, NotFoundError } from '../utils/errorTypes.js';
import { sendDonationConfirmationEmail } from '../utils/emailService.js';

export const createDonation = async (req, res, next) => {
  try {
    const { amount, paymentMethod } = req.body;

    if (!amount || amount <= 0) {
      throw new BadRequestError('Valid amount is required');
    }

    const newDonation = new Donation({
      donor: req.user.id,
      amount,
      paymentMethod
    });

    await newDonation.save();

    // Send confirmation email
    const user = await User.findById(req.user.id);
    sendDonationConfirmationEmail(user, newDonation).catch(error => 
      console.error('Error sending donation confirmation email:', error)
    );

    res.status(201).json(newDonation);
  } catch (error) {
    next(error);
  }
};

export const getAllDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find().populate('donor', 'name');
    res.json(donations);
  } catch (error) {
    next(error);
  }
};

export const getDonationById = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id).populate('donor', 'name');
    if (!donation) {
      throw new NotFoundError('Donation not found');
    }
    res.json(donation);
  } catch (error) {
    next(error);
  }
};

export const getUserDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ donor: req.user.id });
    res.json(donations);
  } catch (error) {
    next(error);
  }
};

export const updateDonationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      throw new NotFoundError('Donation not found');
    }

    donation.status = status;
    await donation.save();

    res.json(donation);
  } catch (error) {
    next(error);
  }
};