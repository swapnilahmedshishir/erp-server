import { NextFunction, Request, Response } from 'express';

import { verifyToken } from '../utils/jwt';
import AppError from '../utils/AppError';

import { HTTP_STATUS } from '../constants/http';
import { MESSAGE } from '../constants/message';

import User from '../modules/user/user.model';

const auth = () => {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) {
        throw new AppError(
          HTTP_STATUS.UNAUTHORIZED,
          MESSAGE.AUTH.TOKEN_MISSING,
        );
      }

      const token = authorizationHeader.startsWith('Bearer ')
        ? authorizationHeader.split(' ')[1]
        : authorizationHeader;

      if (!token) {
        throw new AppError(
          HTTP_STATUS.UNAUTHORIZED,
          MESSAGE.AUTH.TOKEN_MISSING,
        );
      }

      /**
       * Verify JWT
       */
      const decoded = verifyToken(token);

      /**
       * Check user exists
       */
      const user = await User.findOne({
        _id: decoded.userId,
        isDeleted: false,
      }).select('_id name email role');

      if (!user) {
        throw new AppError(
          HTTP_STATUS.UNAUTHORIZED,
          MESSAGE.AUTH.ACCESS_DENIED,
        );
      }

      /**
       * Attach authenticated user to request
       */
      req.user = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
