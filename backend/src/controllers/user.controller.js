const { prisma } = require('../config/database');
const PasswordUtil = require('../utils/password.util');

class UserController {
  // Create user (admin/superadmin only)
  static async createUser(req, res) {
    try {
      const {
        email,
        firstName,
        lastName,
        role,
        institutionId,
        password
      } = req.body;

      const createdBy = req.user.id;
      const currentUserRole = req.user.role;

      // Check if email exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }

      // Set institution based on creator's role
      let finalInstitutionId = institutionId;
      if (currentUserRole === 'admin') {
        finalInstitutionId = req.user.institutionId;
      }

      // Use provided password or default password
      const userPassword = password || process.env.DEFAULT_PASSWORD;
      
      // Validate password
      if (userPassword && userPassword.length < 8) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 8 characters long'
        });
      }
      
      const hashedPassword = await PasswordUtil.hashPassword(userPassword);

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          role,
          institutionId: finalInstitutionId,
          password: hashedPassword,
          isPasswordChanged: false,
          createdBy
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          institutionId: true,
          status: true,
          isPasswordChanged: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user,
        note: 'User must change their password on first login.'
      });
    } catch (error) {
      console.error('Create user error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Get all users (with filters)
  static async getUsers(req, res) {
    try {
      const {
        role,
        status,
        institutionId,
        page = 1,
        limit = 20,
        search
      } = req.query;

      const currentUser = req.user;
      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Build where clause
      const where = {};

      // Apply role-based filters
      if (currentUser.role === 'admin') {
        where.institutionId = currentUser.institutionId;
        where.role = { not: 'superadmin' }; // Admin can't see superadmins
      } else if (currentUser.role === 'superadmin') {
        if (institutionId) {
          where.institutionId = parseInt(institutionId);
        }
      }

      if (role) where.role = role;
      if (status) where.status = status;
      
      if (search) {
        where.OR = [
          { email: { contains: search, mode: 'insensitive' } },
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } }
        ];
      }

      // Get users with pagination
      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            institutionId: true,
            status: true,
            isPasswordChanged: true,
            lastLogin: true,
            createdAt: true,
            updatedAt: true,
            creator: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: parseInt(limit)
        }),
        prisma.user.count({ where })
      ]);

      return res.json({
        success: true,
        data: users,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      });
    } catch (error) {
      console.error('Get users error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get user by ID
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const currentUser = req.user;

      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          institutionId: true,
          status: true,
          isPasswordChanged: true,
          lastLogin: true,
          createdAt: true,
          updatedAt: true,
          creator: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true
            }
          }
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check permissions
      if (currentUser.role === 'admin' && user.institutionId !== currentUser.institutionId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      return res.json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Get user error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Update user
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { firstName, lastName, status } = req.body;
      const currentUser = req.user;

      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) }
      });
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check permissions
      if (currentUser.role === 'admin') {
        if (user.institutionId !== currentUser.institutionId) {
          return res.status(403).json({
            success: false,
            message: 'You can only update users in your institution'
          });
        }
        // Admin cannot change role or institution
        if (req.body.role || req.body.institutionId) {
          return res.status(403).json({
            success: false,
            message: 'You cannot change role or institution'
          });
        }
      }

      // Prepare update data
      const updateData = {};
      if (firstName !== undefined) updateData.firstName = firstName;
      if (lastName !== undefined) updateData.lastName = lastName;
      if (status !== undefined) updateData.status = status;

      // Update user
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: updateData,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          institutionId: true,
          status: true,
          isPasswordChanged: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return res.json({
        success: true,
        message: 'User updated successfully',
        data: updatedUser
      });
    } catch (error) {
      console.error('Update user error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Delete user (soft delete - change status)
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const currentUser = req.user;

      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) }
      });
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check permissions
      if (currentUser.role === 'admin') {
        if (user.institutionId !== currentUser.institutionId) {
          return res.status(403).json({
            success: false,
            message: 'You can only delete users in your institution'
          });
        }
        if (user.role === 'admin') {
          return res.status(403).json({
            success: false,
            message: 'Admin cannot delete other admins'
          });
        }
      }

      // Prevent deleting superadmin
      if (user.role === 'superadmin') {
        return res.status(403).json({
          success: false,
          message: 'Cannot delete superadmin'
        });
      }

      // Soft delete by changing status
      await prisma.user.update({
        where: { id: parseInt(id) },
        data: { status: 'inactive' }
      });

      return res.json({
        success: true,
        message: 'User deactivated successfully'
      });
    } catch (error) {
      console.error('Delete user error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get user statistics
  static async getUserStats(req, res) {
    try {
      const currentUser = req.user;
      const where = {};

      if (currentUser.role === 'admin') {
        where.institutionId = currentUser.institutionId;
        where.role = { not: 'superadmin' };
      }

      // Get aggregated stats
      const stats = await prisma.user.groupBy({
        by: ['role', 'status'],
        where,
        _count: {
          _all: true
        }
      });

      const formattedStats = {
        total: 0,
        byRole: {},
        byStatus: {
          active: 0,
          inactive: 0,
          suspended: 0
        }
      };

      stats.forEach(stat => {
        const count = stat._count._all;
        formattedStats.total += count;
        
        // By role
        if (!formattedStats.byRole[stat.role]) {
          formattedStats.byRole[stat.role] = 0;
        }
        formattedStats.byRole[stat.role] += count;

        // By status
        formattedStats.byStatus[stat.status] += count;
      });

      return res.json({
        success: true,
        data: formattedStats
      });
    } catch (error) {
      console.error('Get stats error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Update own profile (any authenticated user)
  static async updateOwnProfile(req, res) {
    try {
      const userId = req.user.id;
      const { firstName, lastName } = req.body;

      const updateData = {};
      if (firstName !== undefined) updateData.firstName = firstName;
      if (lastName !== undefined) updateData.lastName = lastName;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          institutionId: true,
          status: true,
          isPasswordChanged: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return res.json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedUser
      });
    } catch (error) {
      console.error('Update own profile error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = UserController;