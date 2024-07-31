import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    { 
      user: {
        id: user._id,
        email: user.email
      }
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};