import jwt from 'jsonwebtoken';
import User from '../models/client.js';
import Vendor from '../models/vendor.js';

export default async function checkAuth(req, res, next) {
  const token = req.header('Authorization');

  try {
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    let user = await User.findOne({ email: decoded.email });
    if (!user) {
      user = await Vendor.findOne({ businessemail: decoded.email });
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Authentication token expired' });
    }

    return res.status(401).json({ message: 'Invalid token' });
  }
}
