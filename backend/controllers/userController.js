import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { BadRequestError, UnauthorizedError, NotFoundError } from '../utils/errorTypes.js';
import { sendWelcomeEmail } from '../utils/emailService.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      throw new BadRequestError('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // Send welcome email
    sendWelcomeEmail(user).catch(error => console.error('Error sending welcome email:', error));

    // Create and send token
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Create and send token
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
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
    res.json(user);
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

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.user.id);
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

    res.json({ message: user.subscribedToBlog ? 'Subscribed to blog notifications' : 'Unsubscribed from blog notifications' });
  } catch (error) {
    next(error);
  }
};