// src/routes/user.routes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/user.controller');
const { authenticate, authorize } = require('../auth/auth.middleware');

// Logged-in user
router.get('/me', authenticate, ctrl.getProfile);

// Admin endpoints
router.get('/', authenticate, authorize('ADMIN'), ctrl.listUsers);
router.get('/:id', authenticate, authorize('ADMIN'), ctrl.getUser);
router.patch('/:id', authenticate, ctrl.updateUser);
router.delete('/:id', authenticate, authorize('ADMIN'), ctrl.deleteUser);

module.exports = router;
