import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ZodError, ZodTypeAny } from 'zod';

const validateRequest = (schema: ZodTypeAny): RequestHandler => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = (await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      })) as {
        body: Request['body'];
        params?: Request['params'];
        query?: Request['query'];
      };

      req.body = parsed.body;

      if (parsed.params) {
        Object.assign(req.params, parsed.params);
      }

      if (parsed.query) {
        Object.assign(req.query, parsed.query);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(error);
      }

      next(error);
    }
  };
};

export default validateRequest;
