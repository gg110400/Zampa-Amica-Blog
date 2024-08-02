import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  token: { type: String },
  subscribedToBlog: { type: Boolean, default: false },
  googleId: String,
  profilePicture: String,
  role: { type: String, enum: ['User', 'Admin'], default: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);