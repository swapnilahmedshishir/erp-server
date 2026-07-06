import type { UserRole } from '../constants/role';

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type AsyncFunction<T = void> = () => Promise<T>;

export type SortOrder = 'asc' | 'desc';

export type ObjectId = string;

export type JwtUser = {
  userId: string;
  email: string;
  role: UserRole;
};
