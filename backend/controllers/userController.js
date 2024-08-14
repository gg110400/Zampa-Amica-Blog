import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { BadRequestError, UnauthorizedError, NotFoundError } from '../utils/errorTypes.js';
import { sendWelcomeEmail } from '../utils/emailService.js';
import fs from 'fs/promises';
import path from 'path';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      throw new BadRequestError('User already exists');
    }

    if (password.length < 6) {
      throw new BadRequestError('Password must be at least 6 characters long');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '30d' });
    user.token = token;

    await user.save();

    try {
      await sendWelcomeEmail(user);
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
    }

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};


export const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const avatarUrl = `/uploads/${req.file.filename}`;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.avatar) {
      const oldAvatarPath = path.join(process.cwd(), 'public', user.avatar.replace(/^\//, ''));
      await fs.unlink(oldAvatarPath).catch(err => console.error('Error deleting old avatar:', err));
    }

    user.avatar = avatarUrl;
    await user.save();

    // Usa 'http://localhost:3000' come URL di base predefinito
    const baseUrl = 'http://localhost:3000';
    const fullAvatarUrl = `${baseUrl}${avatarUrl}`;

    res.json({ 
      user: { ...user.toObject(), avatar: fullAvatarUrl },
      message: 'Avatar updated successfully'
    });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }
    
    if (email === 'giuliagiudici120@gmail.com' && user.role !== 'Admin') {
      user.role = 'Admin';
      await user.save();
    }

    res.json({ token: user.token, role: user.role });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const baseUrl = 'http://localhost:3000';
    const fullAvatarUrl = user.avatar ? `${baseUrl}${user.avatar}` : null;

    res.json({ 
      user: { 
        ...user.toObject(), 
        avatar: fullAvatarUrl,
        role: user.role 
      } 
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const userFields = {};
    if (name) userFields.name = name;
    if (email) userFields.email = email;

    let user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: userFields },
      { new: true }
    ).select('-password');

    if (!user) {
      throw new NotFoundError('User not found');
    }

    res.json({ user, token: user.token });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (user.avatar) {
      const avatarPath = path.join(process.cwd(), 'public', user.avatar);
      await fs.unlink(avatarPath).catch(err => console.error('Error deleting avatar:', err));
    }

    await user.deleteOne();
    res.json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};

export const toggleBlogSubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    user.subscribedToBlog = !user.subscribedToBlog;
    await user.save();

    res.json({ 
      message: user.subscribedToBlog ? 'Subscribed to blog notifications' : 'Unsubscribed from blog notifications',
      token: user.token
    });
  } catch (error) {
    next(error);
  }
};

export const setAdminRole = async (req, res, next) => {
  try {
    const adminEmail = 'giuliagiudici120@gmail.com'; 
    const user = await User.findOneAndUpdate(
      { email: adminEmail },
      { role: 'admin' },
      { new: true }
    );

    if (!user) {
      throw new NotFoundError('User not found');
    }

    res.json({ message: 'Admin role set successfully', user });
  } catch (error) {
    next(error);
  }
};