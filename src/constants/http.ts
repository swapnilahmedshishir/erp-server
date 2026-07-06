import httpStatus from 'http-status';

/**
 * HTTP Status Codes
 * Re-exported from the http-status package
 */
export const HTTP_STATUS = httpStatus;

/**
 * Common HTTP Headers
 */
export const HTTP_HEADER = {
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
} as const;

/**
 * Pagination Defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

/**
 * Sorting
 */
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const;
