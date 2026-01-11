const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const { body, param, query } = require('express-validator');

// Apply auth middleware to all routes
router.use(authMiddleware.verifyToken);

// Update own profile (any authenticated user)
router.put('/me/profile',
  [
    body('firstName').optional().trim(),
    body('lastName').optional().trim()
  ],
  UserController.updateOwnProfile
);

// Create user (admin/superadmin only)
router.post('/',
  [
    roleMiddleware.requireRoles('superadmin', 'admin'),
    roleMiddleware.canCreateRole,
    body('email').isEmail().normalizeEmail(),
    body('firstName').optional().trim(),
    body('lastName').optional().trim(),
    body('role').isIn(['admin', 'teacher', 'parent', 'student']),
    body('institutionId').optional().isInt()
  ],
  UserController.createUser
);

// Get all users
router.get('/',
  [
    roleMiddleware.requireRoles('superadmin', 'admin'),
    query('role').optional().isIn(['superadmin', 'admin', 'teacher', 'parent', 'student']),
    query('status').optional().isIn(['active', 'inactive', 'suspended']),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 })
  ],
  UserController.getUsers
);

// Get user by ID
router.get('/:id',
  [
    param('id').isInt(),
    roleMiddleware.requireRoles('superadmin', 'admin'),
    roleMiddleware.canManageUser
  ],
  UserController.getUserById
);

// Update user
router.put('/:id',
  [
    param('id').isInt(),
    roleMiddleware.requireRoles('superadmin', 'admin'),
    roleMiddleware.canManageUser,
    body('firstName').optional().trim(),
    body('lastName').optional().trim(),
    body('status').optional().isIn(['active', 'inactive', 'suspended'])
  ],
  UserController.updateUser
);

// Delete user (deactivate)
router.delete('/:id',
  [
    param('id').isInt(),
    roleMiddleware.requireRoles('superadmin', 'admin'),
    roleMiddleware.canManageUser
  ],
  UserController.deleteUser
);

// Get user statistics
router.get('/stats/overview',
  roleMiddleware.requireRoles('superadmin', 'admin'),
  UserController.getUserStats
);

module.exports = router;