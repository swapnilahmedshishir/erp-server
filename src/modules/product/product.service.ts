import { Types } from 'mongoose';

import AppError from '../../utils/AppError';
import QueryBuilder from '../../utils/queryBuilder';
import { uploadToCloudinary, deleteFromCloudinary } from '../../utils/uploader';

import { HTTP_STATUS } from '../../constants/http';
import { MESSAGE } from '../../constants/message';

import Product from './product.model';
import {
  ICreateProduct,
  IProductDocument,
  IUpdateProduct,
} from './product.interface';

const extractPublicIdFromUrl = (url: string): string => {
  const segments = url.split('/');
  const fileName = segments[segments.length - 1];
  const publicIdWithFolder = segments
    .slice(segments.indexOf('upload') + 2)
    .join('/');

  return publicIdWithFolder
    ? publicIdWithFolder.replace(/\.[^/.]+$/, '')
    : fileName.replace(/\.[^/.]+$/, '');
};

/**
 * Create Product
 */
const createProduct = async (
  payload: Omit<ICreateProduct, 'image' | 'imagePublicId' | 'createdBy'>,
  file: Express.Multer.File,
  userId: Types.ObjectId,
): Promise<IProductDocument> => {
  if (!file) {
    throw new AppError(HTTP_STATUS.BAD_REQUEST, MESSAGE.PRODUCT.IMAGE_REQUIRED);
  }

  const existingProduct = await Product.isProductExistsBySku(payload.sku);

  if (existingProduct) {
    throw new AppError(
      HTTP_STATUS.CONFLICT,
      MESSAGE.PRODUCT.SKU_ALREADY_EXISTS,
    );
  }

  if (payload.sellingPrice < payload.purchasePrice) {
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      'Selling price cannot be less than purchase price.',
    );
  }

  const imageUrl = await uploadToCloudinary(file);
  const imagePublicId = extractPublicIdFromUrl(imageUrl);

  const product = await Product.create({
    ...payload,
    image: imageUrl,
    imagePublicId,
    createdBy: userId,
  });

  return product;
};

/**
 * Get All Products
 */
const getAllProducts = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Product.find({ isDeleted: false }),
    query,
  )
    .search(['name', 'sku', 'category'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    meta,
    data,
  };
};

/**
 * Get Product By Id
 */
const getProductById = async (id: string): Promise<IProductDocument> => {
  const product = await Product.findOne({ _id: id, isDeleted: false });

  if (!product) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, MESSAGE.PRODUCT.NOT_FOUND);
  }

  return product;
};

/**
 * Update Product
 */
const updateProduct = async (
  id: string,
  payload: IUpdateProduct,
  file: Express.Multer.File | undefined,
  userId: Types.ObjectId,
): Promise<IProductDocument> => {
  const existingProduct = await Product.findOne({ _id: id, isDeleted: false });

  if (!existingProduct) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, MESSAGE.PRODUCT.NOT_FOUND);
  }

  if (payload.sku && payload.sku !== existingProduct.sku) {
    const duplicateSku = await Product.isProductExistsBySku(payload.sku);

    if (duplicateSku) {
      throw new AppError(
        HTTP_STATUS.CONFLICT,
        MESSAGE.PRODUCT.SKU_ALREADY_EXISTS,
      );
    }
  }

  const nextPurchasePrice =
    payload.purchasePrice ?? existingProduct.purchasePrice;
  const nextSellingPrice = payload.sellingPrice ?? existingProduct.sellingPrice;

  if (nextSellingPrice < nextPurchasePrice) {
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      'Selling price cannot be less than purchase price.',
    );
  }

  let image = existingProduct.image;
  let imagePublicId = existingProduct.imagePublicId;

  if (file) {
    const newImageUrl = await uploadToCloudinary(file);
    const newImagePublicId = extractPublicIdFromUrl(newImageUrl);

    await deleteFromCloudinary(existingProduct.imagePublicId);

    image = newImageUrl;
    imagePublicId = newImagePublicId;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      ...payload,
      image,
      imagePublicId,
      updatedBy: userId,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedProduct) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, MESSAGE.PRODUCT.NOT_FOUND);
  }

  return updatedProduct;
};

/**
 * Delete Product (Soft Delete)
 */
const deleteProduct = async (id: string): Promise<null> => {
  const existingProduct = await Product.findOne({ _id: id, isDeleted: false });

  if (!existingProduct) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, MESSAGE.PRODUCT.NOT_FOUND);
  }

  await Product.findByIdAndUpdate(id, { isDeleted: true });

  await deleteFromCloudinary(existingProduct.imagePublicId);

  return null;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
