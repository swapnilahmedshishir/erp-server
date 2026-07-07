import { Router } from 'express';

import authRoutes from '../modules/auth/auth.route';
import userRoutes from '../modules/user/user.route';
import productRoutes from '../modules/product/product.route';
import saleRoutes from '../modules/sales/sale.route';

const router = Router();

router.use('/auth', authRoutes);

router.use('/users', userRoutes);

router.use('/products', productRoutes);

router.use('/sales', saleRoutes);

export default router;
