const router = require('express').Router();
const ctrl = require('../controllers/bookings.controller');
const { authenticate, authorize } = require('../auth/auth.middleware');

router.post('/', authenticate, ctrl.create);
router.get('/', authenticate, ctrl.list);
router.patch('/:id/approve', authenticate, authorize('ADMIN', 'STAFF'), ctrl.approve);
router.patch('/:id/reject', authenticate, authorize('ADMIN', 'STAFF'), ctrl.reject);
router.patch('/:id/return', authenticate, authorize('ADMIN', 'STAFF'), ctrl.returned);

module.exports = router;
