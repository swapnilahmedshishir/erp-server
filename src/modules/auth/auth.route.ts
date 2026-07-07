import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
// import auth from "../../middlewares/auth.middleware";

import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

/**
 * Login
 * POST /api/v1/auth/login
 */
router.post(
  '/login',
  validateRequest(AuthValidation.loginSchema),
  AuthController.login,
);

/**
 * Get Logged-in User Profile
 * GET /api/v1/auth/profile
 *
 * TODO:
 * Enable auth middleware after it is implemented.
 */
router.get(
  '/profile',
  // auth(),
  AuthController.getProfile,
);

export default router;
