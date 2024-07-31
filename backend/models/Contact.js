import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: String,
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'In Progress', 'Resolved'], default: 'New' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Contact', contactSchema);