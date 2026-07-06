import type { JwtUser } from './common';

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
    }
  }
}

export {};
