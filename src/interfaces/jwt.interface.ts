import type { UserRole } from '../constants/role';

export interface IJwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface ITokenResponse {
  accessToken: string;
}

export interface IJwtVerifyResult extends IJwtPayload {
  iat?: number;
  exp?: number;
}
