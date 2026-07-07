import { Types } from "mongoose";

import AppError from "../../utils/AppError";
import QueryBuilder from "../../utils/queryBuilder";

import { HTTP_STATUS } from "../../constants/http";
import { MESSAGE } from "../../constants/message";

import Product from "../product/product.model";

import Sale from "./sale.model";
import { ICreateSale, ISaleDocument } from "./sale.interface";

/**
 * Create Sale
 */
const createSale = async (
  payload: ICreateSale,
  userId: Types.ObjectId,
): Promise<ISaleDocument> => {
  const saleItems = [];
  let grandTotal = 0;

  for (const item of payload.products) {
    const product = await Product.findOne({
      _id: item.product,
      isDeleted: false,
    });

    if (!product) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, MESSAGE.PRODUCT.NOT_FOUND);
    }

    if (product.stock < item.quantity) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        `${product.name} has insufficient stock.`,
      );
    }

    const subtotal = product.sellingPrice * item.quantity;

    grandTotal += subtotal;

    saleItems.push({
      product: product._id,
      quantity: item.quantity,
      price: product.sellingPrice,
      subtotal,
    });

    product.stock -= item.quantity;

    await product.save();
  }

  const sale = await Sale.create({
    products: saleItems,
    grandTotal,
    soldBy: userId,
  });

  return sale;
};

/**
 * Get All Sales
 */
const getAllSales = async (query: Record<string, unknown>) => {
  const saleQuery = new QueryBuilder(
    Sale.find()
      .populate("soldBy", "name email")
      .populate("products.product", "name sku category image"),
    query,
  )
    .sort()
    .paginate()
    .fields();

  const data = await saleQuery.modelQuery;

  const meta = await saleQuery.countTotal();

  return {
    meta,
    data,
  };
};

/**
 * Get Sale By Id
 */
const getSaleById = async (id: string): Promise<ISaleDocument> => {
  const sale = await Sale.findById(id)
    .populate("soldBy", "name email")
    .populate("products.product", "name sku category image");

  if (!sale) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, "Sale not found.");
  }

  return sale;
};

export const SaleService = {
  createSale,
  getAllSales,
  getSaleById,
};
