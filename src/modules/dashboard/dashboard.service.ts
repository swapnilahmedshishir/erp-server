import Product from '../product/product.model';
import Sale from '../sales/sale.model';

const getDashboardStats = async () => {
  const [totalProducts, totalSales, revenueResult, lowStockProducts] =
    await Promise.all([
      Product.countDocuments({
        isDeleted: false,
      }),

      Sale.countDocuments(),

      Sale.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: '$grandTotal',
            },
          },
        },
      ]),

      Product.find({
        isDeleted: false,
        stock: {
          $lte: 10,
        },
      })
        .select('name sku stock category image')
        .sort({
          stock: 1,
        }),
    ]);

  return {
    totalProducts,
    totalSales,
    totalRevenue: revenueResult[0]?.totalRevenue ?? 0,
    lowStockProducts,
  };
};

export const DashboardService = {
  getDashboardStats,
};
