import { Router } from 'express';

import auth from '../../middlewares/auth.middleware';
import role from '../../middlewares/role.middleware';
import validateRequest from '../../middlewares/validateRequest';

import { upload } from '../../utils/uploader';

import { USER_ROLE } from '../../constants/role';

import { ProductController } from './product.controller';
import { ProductValidation } from './product.validation';

const router = Router();

/**
 * ==========================================================
 * Product Routes
 * Base Route : /api/v1/products
 * ==========================================================
 */

/**
 * Create Product
 *
 * Access:
 * Admin
 * Manager
 */
router.post(
  '/',
  auth(),
  role(USER_ROLE.MANAGER),
  upload.single('image'),
  validateRequest(ProductValidation.createProductSchema),
  ProductController.createProduct,
);

/**
 * Get All Products
 *
 * Access:
 * Admin
 * Manager
 * Employee
 */
router.get(
  '/',
  auth(),
  role(USER_ROLE.MANAGER, USER_ROLE.EMPLOYEE),
  validateRequest(ProductValidation.getProductsSchema),
  ProductController.getAllProducts,
);

/**
 * Get Single Product
 *
 * Access:
 * Admin
 * Manager
 * Employee
 */
router.get(
  '/:id',
  auth(),
  role(USER_ROLE.MANAGER, USER_ROLE.EMPLOYEE),
  validateRequest(ProductValidation.getProductSchema),
  ProductController.getProductById,
);

/**
 * Update Product
 *
 * Access:
 * Admin
 * Manager
 */
router.patch(
  '/:id',
  auth(),
  role(USER_ROLE.MANAGER),
  upload.single('image'),
  validateRequest(ProductValidation.updateProductSchema),
  ProductController.updateProduct,
);

/**
 * Delete Product
 *
 * Access:
 * Admin Only
 */
router.delete(
  '/:id',
  auth(),
  role(),
  validateRequest(ProductValidation.deleteProductSchema),
  ProductController.deleteProduct,
);

export default router;
