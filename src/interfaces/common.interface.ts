import type { IPaginationMeta } from './pagination.interface';

export interface IApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  meta?: IPaginationMeta;
}

export interface IGenericErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  error?: unknown;
  stack?: string;
}

export interface IServiceResult<T = unknown> {
  data: T;
  meta?: IPaginationMeta;
}
