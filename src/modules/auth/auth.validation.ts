import { z } from 'zod';

/**
 * Login Validation Schema
 */
const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .min(1, 'Email is required.')
      .email('Please provide a valid email address.')
      .trim(),

    password: z
      .string()
      .min(1, 'Password is required.')
      .min(6, 'Password must be at least 6 characters.')
      .max(100, 'Password cannot exceed 100 characters.'),
  }),
});

export const AuthValidation = {
  loginSchema,
};
