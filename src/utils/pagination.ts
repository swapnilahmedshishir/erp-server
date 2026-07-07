import { PAGINATION, SORT_ORDER } from '../constants/http';
import { IPaginationOptions } from '../interfaces/pagination.interface';

export interface IPaginationResult {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export const calculatePagination = (
  options: IPaginationOptions,
): IPaginationResult => {
  const page = Math.max(Number(options.page) || PAGINATION.DEFAULT_PAGE, 1);

  const limit = Math.min(
    Math.max(Number(options.limit) || PAGINATION.DEFAULT_LIMIT, 1),
    PAGINATION.MAX_LIMIT,
  );

  const skip = (page - 1) * limit;

  const sortBy = options.sortBy?.trim() || 'createdAt';

  const sortOrder =
    options.sortOrder === SORT_ORDER.ASC ? SORT_ORDER.ASC : SORT_ORDER.DESC;

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
