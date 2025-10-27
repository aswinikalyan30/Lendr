const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

function loadKey(envPathVar, envRawVar) {
  const filePath = process.env[envPathVar];
  if (filePath) {
    try {
      return fs.readFileSync(path.resolve(filePath), 'utf8');
    } catch (err) {
      console.warn(`Could not read key file at ${filePath}:`, err.message);
    }
  }
  if (process.env[envRawVar]) return process.env[envRawVar];
  return null;
}

const PUBLIC_KEY = loadKey('JWT_PUBLIC_KEY_PATH', 'JWT_PUBLIC_KEY');
const HMAC_SECRET = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET || null;
const USE_RS256 = Boolean(PUBLIC_KEY && HMAC_SECRET === null);

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  if (USE_RS256) {
    // Verify using RS256 public key
    jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] }, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = user;
      next();
    });
  } else {
    // Fall back to HS256 using HMAC secret
    if (!HMAC_SECRET) return res.status(500).json({ message: 'Server not configured with JWT secret' });
    jwt.verify(token, HMAC_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = user;
      next();
    });
  }
};

exports.authorize = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  next();
};