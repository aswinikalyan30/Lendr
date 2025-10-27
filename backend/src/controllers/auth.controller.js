const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../model');

// Token expiry
const JWT_EXPIRES_IN = '7d';

// Try to load RS256 keys first (preferred). Keys can be provided either as file paths or
// as raw PEM strings in environment variables.
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

const PRIVATE_KEY = loadKey('JWT_PRIVATE_KEY_PATH', 'JWT_PRIVATE_KEY');
const PUBLIC_KEY = loadKey('JWT_PUBLIC_KEY_PATH', 'JWT_PUBLIC_KEY');

const USE_RS256 = Boolean(PRIVATE_KEY && PUBLIC_KEY);

// If RS256 keys are not available, fall back to an HMAC secret (HS256) from env.
const HMAC_SECRET = process.env.JWT_SECRET || process.env.ACCESS_TOKEN_SECRET || null;
if (!USE_RS256 && !HMAC_SECRET) {
  console.warn('No JWT signing keys found. Set JWT_PRIVATE_KEY_PATH & JWT_PUBLIC_KEY_PATH for RS256 or JWT_SECRET for HS256.');
}

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'STUDENT'
    });

    // Generate JWT token. Use RS256 if keys are available, otherwise HS256.
    let token;
    if (USE_RS256) {
      token = jwt.sign({ id: user.id, email: user.email, role: user.role }, PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: JWT_EXPIRES_IN,
      });
    } else {
      token = jwt.sign({ id: user.id, email: user.email, role: user.role }, HMAC_SECRET, {
        algorithm: 'HS256',
        expiresIn: JWT_EXPIRES_IN,
      });
    }

    // Return user data (excluding password)
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token. Use RS256 if keys are available, otherwise HS256.
    let token;
    if (USE_RS256) {
      token = jwt.sign({ id: user.id, email: user.email, role: user.role }, PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: JWT_EXPIRES_IN,
      });
    } else {
      token = jwt.sign({ id: user.id, email: user.email, role: user.role }, HMAC_SECRET, {
        algorithm: 'HS256',
        expiresIn: JWT_EXPIRES_IN,
      });
    }

    // Return user data (excluding password)
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
