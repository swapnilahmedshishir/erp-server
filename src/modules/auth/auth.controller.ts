import { Request, Response } from 'express';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { HTTP_STATUS } from '../../constants/http';
import { MESSAGE } from '../../constants/message';

import { AuthService } from './auth.service';

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: MESSAGE.AUTH.LOGIN_SUCCESS,
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.getProfile(req.user!.userId);

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: MESSAGE.AUTH.PROFILE_FETCHED,
    data: result,
  });
});

export const AuthController = {
  login,
  getProfile,
};
