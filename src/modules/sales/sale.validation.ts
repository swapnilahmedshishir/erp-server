import { z } from 'zod';

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId.');

const createSaleSchema = z.object({
  body: z.object({
    products: z
      .array(
        z.object({
          product: objectIdSchema,

          quantity: z.coerce
            .number()
            .int('Quantity must be a whole number.')
            .positive('Quantity must be greater than 0.'),
        }),
      )
      .min(1, 'At least one product is required.'),
  }),
});

const getSaleSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

const getSalesSchema = z.object({
  query: z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
});

export const SaleValidation = {
  createSaleSchema,
  getSaleSchema,
  getSalesSchema,
};
