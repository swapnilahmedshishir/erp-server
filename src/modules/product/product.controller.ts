// src/modules/product/product.controller.ts

import { Request, Response } from 'express';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { HTTP_STATUS } from '../../constants/http';
import { MESSAGE } from '../../constants/message';

import { ProductService } from './product.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  console.log('========== CONTROLLER ==========');
  console.log('BODY:', req.body);
  console.log('FILE:', req.file);
  console.log('USER:', req.user);

  const result = await ProductService.createProduct(
    req.body,
    req.file as Express.Multer.File,
    req.user!.userId,
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
  const result = await ProductService.getProductById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: MESSAGE.PRODUCT.FETCHED,
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.updateProduct(
    req.params.id,
    req.body,
    req.file,
    req.user!.userId,
  );

  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: MESSAGE.PRODUCT.UPDATED,
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  await ProductService.deleteProduct(req.params.id);

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
