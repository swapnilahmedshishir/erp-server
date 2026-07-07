import { Router } from 'express';

import { UserController } from './user.controller';
// import auth from "../../middlewares/auth.middleware";
// import role from "../../middlewares/role.middleware";
// import { USER_ROLE } from "../../constants/role";

const router = Router();

/**
 * User Routes
 *
 * These routes are intended for future Admin/User Management.
 * They can be protected later using auth & role middleware.
 */

// Create User
router.post(
  '/',
  // auth(),
  // role(USER_ROLE.ADMIN),
  UserController.createUser,
);

// Get User By ID
router.get(
  '/:id',
  // auth(),
  // role(USER_ROLE.ADMIN),
  UserController.getUserById,
);

// Update User
router.patch(
  '/:id',
  // auth(),
  // role(USER_ROLE.ADMIN),
  UserController.updateUser,
);

// Soft Delete User
router.delete(
  '/:id',
  // auth(),
  // role(USER_ROLE.ADMIN),
  UserController.deleteUser,
);

export default router;
