import { NextFunction, Request, Response } from 'express';

import AppError from '../utils/AppError';

import { HTTP_STATUS } from '../constants/http';
import { MESSAGE } from '../constants/message';
import { USER_ROLE, UserRole } from '../constants/role';

const role = (...allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(
        new AppError(HTTP_STATUS.UNAUTHORIZED, MESSAGE.AUTH.ACCESS_DENIED),
      );
    }

    /**
     *  check Admin
     */
    if (req.user.role === USER_ROLE.ADMIN) {
      return next();
    }

    /**
     * Check allowed roles
     */
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(HTTP_STATUS.FORBIDDEN, MESSAGE.COMMON.FORBIDDEN),
      );
    }

    next();
  };
};

export default role;
