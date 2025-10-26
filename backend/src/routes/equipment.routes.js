const router = require('express').Router();
const ctrl = require('../controllers/equipments.controller');
const { authenticate, authorize } = require('../auth/auth.middleware');

router.get('/', authenticate, ctrl.list);
router.post('/', authenticate, authorize('ADMIN', 'STAFF'), ctrl.create);
router.put('/:id', authenticate, authorize('ADMIN', 'STAFF'), ctrl.update);
router.delete('/:id', authenticate, authorize('ADMIN', 'STAFF'), ctrl.remove);

module.exports = router;
