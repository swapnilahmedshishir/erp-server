import { Types } from 'mongoose';
import { Request, Response } from 'express';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { HTTP_STATUS } from '../../constants/http';
import { MESSAGE } from '../../constants/message';

import { SaleService } from './sale.service';

const createSale = catchAsync(async (req: Request, res: Response) => {
  const result = await SaleService.createSale(
    req.body,
    new Types.ObjectId(req.user!.userId),
  );

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.CREATED,
    message: MESSAGE.SALE.CREATED,
    data: result,
  });
});

const getAllSales = catchAsync(async (req: Request, res: Response) => {
  const result = await SaleService.getAllSales(
    req.query as Record<string, unknown>,
  );

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: MESSAGE.SALE.FETCHED_ALL,
    meta: result.meta,
    data: result.data,
  });
});

const getSaleById = catchAsync(async (req: Request, res: Response) => {
  const result = await SaleService.getSaleById(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: MESSAGE.SALE.FETCHED,
    data: result,
  });
});

export const SaleController = {
  createSale,
  getAllSales,
  getSaleById,
};
