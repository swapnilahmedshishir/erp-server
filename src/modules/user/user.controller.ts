import { Request, Response } from 'express';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { HTTP_STATUS } from '../../constants/http';
import { MESSAGE } from '../../constants/message';

import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.CREATED,
    message: MESSAGE.COMMON.SUCCESS,
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserById(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: MESSAGE.COMMON.SUCCESS,
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateUser(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: MESSAGE.COMMON.SUCCESS,
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  await UserService.deleteUser(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: MESSAGE.COMMON.SUCCESS,
    data: null,
  });
});

export const UserController = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
