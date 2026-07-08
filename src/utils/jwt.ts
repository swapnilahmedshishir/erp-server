import jwt, { Secret, SignOptions } from 'jsonwebtoken';

import { env } from '../config/env';
import { IJwtPayload, IJwtVerifyResult } from '../interfaces/jwt.interface';

/**
 * Generate JWT Access Token
 */
export const generateToken = (
  payload: IJwtPayload,
  secret: Secret = env.JWT_SECRET,
  expiresIn: SignOptions['expiresIn'] = env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
): string => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

/**
 * Verify JWT Access Token
 */
export const verifyToken = (
  token: string,
  secret: Secret = env.JWT_SECRET,
): IJwtVerifyResult => {
  return jwt.verify(token, secret) as IJwtVerifyResult;
};
