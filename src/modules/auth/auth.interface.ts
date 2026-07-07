import { UserRole } from '../../constants/role';

/**
 * Login Request Payload
 */
export interface ILoginUser {
  email: string;
  password: string;
}

/**
 * JWT Payload
 */
export interface IAuthPayload {
  userId: string;
  email: string;
  role: UserRole;
}

/**
 * Login Response
 */
export interface ILoginResponse {
  accessToken: string;
}

/**
 * Authenticated User
 * Used for profile and future auth features.
 */
export interface IAuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
