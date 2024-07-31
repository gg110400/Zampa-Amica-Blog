import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'EUR' },
  paymentMethod: String,
  transactionId: String,
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  message: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Donation', donationSchema);