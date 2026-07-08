import { Request, Response } from 'express';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { HTTP_STATUS } from '../../constants/http';
import { MESSAGE } from '../../constants/message';

import { DashboardService } from './dashboard.service';

const getDashboardStats = catchAsync(async (_req: Request, res: Response) => {
  const result = await DashboardService.getDashboardStats();

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: MESSAGE.DASHBOARD.FETCHED,
    data: result,
  });
});

export const DashboardController = {
  getDashboardStats,
};
