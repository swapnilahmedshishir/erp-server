import { Response } from 'express';

import { IApiResponse } from '../interfaces/common.interface';

const sendResponse = <T>(res: Response, payload: IApiResponse<T>): Response => {
  const { success, statusCode, message, meta, data } = payload;

  return res.status(statusCode).json({
    success,
    statusCode,
    message,
    ...(meta && { meta }),
    ...(data !== undefined && { data }),
  });
};

export default sendResponse;
