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

    // Validate password
    if (password.length < 6) {
      throw new BadRequestError('Password must be at least 6 characters long');
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

    // Generate token
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '30d' });
    user.token = token;

    await user.save();

    // Send welcome email
    try {
      await sendWelcomeEmail(user);
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      // Continue with registration even if email fails
    }

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

// Other functions remain the same

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

    // Return the existing token
    res.json({ token: user.token });
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
    res.json({ user, token: user.token });
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

    res.json({ 
      message: user.subscribedToBlog ? 'Subscribed to blog notifications' : 'Unsubscribed from blog notifications',
      token: user.token
    });
  } catch (error) {
    next(error);
  }
};