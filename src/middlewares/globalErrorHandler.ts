import { ErrorRequestHandler } from 'express';
import { number, ZodError } from 'zod';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import AppError from '../utils/AppError';
import { env } from '../config/env';
import { HTTP_STATUS } from '../constants/http';
import { MESSAGE } from '../constants/message';

const globalErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message: string = MESSAGE.COMMON.INTERNAL_SERVER_ERROR;
  let errorDetails: unknown = null;

  /**
   * Custom App Error
   */
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  /**
   * Zod Validation Error
   */
  else if (error instanceof ZodError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = MESSAGE.COMMON.VALIDATION_ERROR;

    errorDetails = error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));
  }

  /**
   * MongoDB Validation Error
   */
  else if (error instanceof mongoose.Error.ValidationError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = 'Database validation failed.';

    errorDetails = Object.values(error.errors).map((err) => ({
      path: err.path,
      message: err.message,
    }));
  }

  /**
   * Invalid MongoDB ObjectId
   */
  else if (error instanceof mongoose.Error.CastError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = 'Invalid resource id.';
  }

  /**
   * JWT Error
   */
  else if (error instanceof jwt.JsonWebTokenError) {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = MESSAGE.AUTH.TOKEN_INVALID;
  }

  /**
   * JWT Expired
   */
  else if (error instanceof jwt.TokenExpiredError) {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Access token has expired.';
  }

  /**
   * Native Error
   */
  else if (error instanceof Error) {
    message = error.message;
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(errorDetails && { errorDetails }),
    ...(env.NODE_ENV === 'development' &&
      error instanceof Error && {
        stack: error.stack,
      }),
  });
};

export default globalErrorHandler;
