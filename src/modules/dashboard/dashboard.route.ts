import { Router } from 'express';

import auth from '../../middlewares/auth.middleware';
import role from '../../middlewares/role.middleware';

import { USER_ROLE } from '../../constants/role';

import { DashboardController } from './dashboard.controller';

const router = Router();

/**
 * Dashboard Statistics
 * Access:
 * Admin
 * Manager
 */
router.get(
  '/',
  auth(),
  role(USER_ROLE.MANAGER, USER_ROLE.EMPLOYEE),
  DashboardController.getDashboardStats,
);

export default router;
