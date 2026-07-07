import { Router } from "express";

import auth from "../../middlewares/auth.middleware";
import role from "../../middlewares/role.middleware";
import validateRequest from "../../middlewares/validateRequest";

import { USER_ROLE } from "../../constants/role";

import { SaleController } from "./sale.controller";
import { SaleValidation } from "./sale.validation";

const router = Router();

/**
 * Create Sale
 * Access:
 * Admin
 * Manager
 * Employee
 */
router.post(
  "/",
  auth(),
  role(USER_ROLE.MANAGER, USER_ROLE.EMPLOYEE),
  validateRequest(SaleValidation.createSaleSchema),
  SaleController.createSale,
);

/**
 * Get All Sales
 * Access:
 * Admin
 * Manager
 */
router.get(
  "/",
  auth(),
  role(USER_ROLE.MANAGER),
  validateRequest(SaleValidation.getSalesSchema),
  SaleController.getAllSales,
);

/**
 * Get Single Sale
 * Access:
 * Admin
 * Manager
 */
router.get(
  "/:id",
  auth(),
  role(USER_ROLE.MANAGER),
  validateRequest(SaleValidation.getSaleSchema),
  SaleController.getSaleById,
);

export default router;
