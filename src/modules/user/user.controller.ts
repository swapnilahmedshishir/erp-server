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
  const { id } = req.params;

  const result = await UserService.getUserById(id);

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: MESSAGE.COMMON.SUCCESS,
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await UserService.updateUser(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: MESSAGE.COMMON.SUCCESS,
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await UserService.deleteUser(id);

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
