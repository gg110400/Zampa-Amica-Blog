import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: String,
  age: Number,
  gender: { type: String, enum: ['Male', 'Female', 'Unknown'] },
  description: String,
  imageUrl: String,
  adoptionStatus: { type: String, enum: ['Available', 'Pending', 'Adopted'], default: 'Available' },
  medicalHistory: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Animal', animalSchema);