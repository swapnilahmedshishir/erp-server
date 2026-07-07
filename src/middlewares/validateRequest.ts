import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AnyZodObject, ZodEffects, ZodError } from 'zod';

type ValidationSchema = AnyZodObject | ZodEffects<AnyZodObject>;

const validateRequest = (schema: ValidationSchema): RequestHandler => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      // body overwrite করা যাবে
      req.body = parsed.body;

      // params overwrite করা যাবে
      Object.assign(req.params, parsed.params);

      // query overwrite করা যাবে না
      Object.assign(req.query, parsed.query);

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
