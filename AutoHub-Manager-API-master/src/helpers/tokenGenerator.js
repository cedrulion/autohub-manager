import jwt from 'jsonwebtoken';

const generateToken = (email) => {
  const payload = { email }; // You can include additional information in the payload if needed
  const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key_here';  // Use an environment variable or hardcoded key

  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Set an expiration time for the token
};

export default generateToken;
