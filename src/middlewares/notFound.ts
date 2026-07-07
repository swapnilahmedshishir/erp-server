import { NextFunction, Request, Response } from 'express';

import AppError from '../utils/AppError';
import { HTTP_STATUS } from '../constants/http';

const notFound = (req: Request, _res: Response, next: NextFunction): void => {
  next(
    new AppError(HTTP_STATUS.NOT_FOUND, `Route ${req.originalUrl} not found.`),
  );
};

export default notFound;
