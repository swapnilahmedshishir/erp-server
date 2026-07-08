import { z } from 'zod';

/**
 * MongoDB ObjectId Validation
 */
const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId.');

/**
 * Create Product
 */
const createProductSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(1, 'Product name is required.').max(150),

      sku: z
        .string()
        .trim()
        .min(1, 'SKU is required.')
        .max(50)
        .transform((value) => value.toUpperCase()),

      category: z.string().trim().min(1, 'Category is required.').max(100),

      purchasePrice: z.coerce
        .number()
        .nonnegative('Purchase price cannot be negative.'),

      sellingPrice: z.coerce
        .number()
        .nonnegative('Selling price cannot be negative.'),

      stock: z.coerce.number().int().nonnegative('Stock cannot be negative.'),
    })
    .superRefine((data, ctx) => {
      if (data.sellingPrice < data.purchasePrice) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['sellingPrice'],
          message: 'Selling price cannot be less than purchase price.',
        });
      }
    }),
});

/**
 * Update Product
 */
const updateProductSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(2).max(150).optional(),

      sku: z
        .string()
        .trim()
        .min(2)
        .max(50)
        .transform((value) => value.toUpperCase())
        .optional(),

      category: z.string().trim().min(2).max(100).optional(),

      purchasePrice: z.coerce.number().min(0).optional(),

      sellingPrice: z.coerce.number().min(0).optional(),

      stock: z.coerce.number().int().min(0).optional(),
    })
    .superRefine((data, ctx) => {
      if (
        data.purchasePrice !== undefined &&
        data.sellingPrice !== undefined &&
        data.sellingPrice < data.purchasePrice
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['sellingPrice'],
          message: 'Selling price cannot be less than purchase price.',
        });
      }
    }),

  params: z.object({
    id: objectIdSchema,
  }),
});

/**
 * Product Details
 */
const getProductSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

/**
 * Delete Product
 */
const deleteProductSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

/**
 * Product List
 */
const getProductsSchema = z.object({
  query: z.object({
    searchTerm: z.string().optional(),

    category: z.string().optional(),

    page: z.coerce.number().optional(),

    limit: z.coerce.number().optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
});

export const ProductValidation = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  deleteProductSchema,
  getProductsSchema,
};
