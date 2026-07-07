import { z } from 'zod';

/**
 * Login Validation Schema
 */
const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required.',
      })
      .trim()
      .email('Please provide a valid email address.'),

    password: z
      .string({
        required_error: 'Password is required.',
      })
      .min(6, 'Password must be at least 6 characters.')
      .max(100, 'Password cannot exceed 100 characters.'),
  }),
});

/**
 * Future Schemas
 *
 * registerSchema
 * changePasswordSchema
 * forgotPasswordSchema
 * resetPasswordSchema
 */

export const AuthValidation = {
  loginSchema,
};
