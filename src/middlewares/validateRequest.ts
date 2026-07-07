import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AnyZodObject, ZodEffects, ZodError } from 'zod';

type ValidationSchema = AnyZodObject | ZodEffects<AnyZodObject>;

const validateRequest = (schema: ValidationSchema): RequestHandler => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

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
