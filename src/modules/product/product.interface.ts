import { HydratedDocument, Model, Types } from 'mongoose';

/**
 * Product Entity
 */
export interface IProduct {
  name: string;
  sku: string;
  category: string;

  purchasePrice: number;
  sellingPrice: number;

  stock: number;

  image: string;
  imagePublicId: string;

  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;

  isDeleted: boolean;
}

/**
 * Product Instance Methods
 */
export interface IProductMethods {
  /**
   * Reserved for future instance methods
   */
}

/**
 * Hydrated Product Document
 */
export type IProductDocument = HydratedDocument<IProduct, IProductMethods>;

/**
 * Product Model Static Methods
 */
export interface IProductModel extends Model<IProduct, {}, IProductMethods> {
  isProductExistsBySku(sku: string): Promise<IProductDocument | null>;
}

/**
 * Create Product DTO
 */
export interface ICreateProduct {
  name: string;
  sku: string;
  category: string;

  purchasePrice: number;
  sellingPrice: number;

  stock: number;

  image: string;
  imagePublicId: string;

  createdBy: Types.ObjectId;
}

/**
 * Update Product DTO
 */
export interface IUpdateProduct extends Partial<
  Omit<ICreateProduct, 'createdBy'>
> {
  updatedBy?: Types.ObjectId;
}
