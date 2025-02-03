import jwt from 'jsonwebtoken';
import User from '../models/client.js';
import Vendor from '../models/vendor.js';

export default async function checkAuth(req, res, next) {
  let token = req.header('Authorization');

  try {
    // Ensure token exists
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Remove "Bearer " prefix if present
    if (token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the user exists in either Client or Vendor model
    let user = await User.findOne({ email: decoded.email });
    if (!user) {
      user = await Vendor.findOne({ businessemail: decoded.email });
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Authentication token expired' });
    }

    return res.status(401).json({ message: 'Invalid token' });
  }
}
