import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Convertir l'ID décodé en ObjectId
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Middleware Error:', error.message);
    res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};

export default protectRoute;
