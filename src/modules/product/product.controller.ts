import { Types } from 'mongoose';

import { Request, Response } from 'express';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { HTTP_STATUS } from '../../constants/http';
import { MESSAGE } from '../../constants/message';

import { ProductService } from './product.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(
    req.body,
    req.file as Express.Multer.File,
    new Types.ObjectId(req.user!.userId),
  );

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.CREATED,
    message: MESSAGE.PRODUCT.CREATED,
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProducts(
    req.query as Record<string, unknown>,
  );

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: MESSAGE.PRODUCT.FETCHED_ALL,
    meta: result.meta,
    data: result.data,
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getProductById(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: MESSAGE.PRODUCT.FETCHED,
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.updateProduct(
    req.params.id as string,
    req.body,
    req.file,
    new Types.ObjectId(req.user!.userId),
  );

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: MESSAGE.PRODUCT.UPDATED,
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  await ProductService.deleteProduct(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: MESSAGE.PRODUCT.DELETED,
    data: null,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
