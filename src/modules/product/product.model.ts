import { Schema, model } from 'mongoose';

import {
  IProduct,
  IProductMethods,
  IProductModel,
  IProductDocument,
} from './product.interface';

const productSchema = new Schema<IProduct, IProductModel, IProductMethods>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required.'],
      trim: true,
      minlength: [2, 'Product name must be at least 2 characters.'],
      maxlength: [150, 'Product name cannot exceed 150 characters.'],
    },

    sku: {
      type: String,
      required: [true, 'SKU is required.'],
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },

    category: {
      type: String,
      required: [true, 'Category is required.'],
      trim: true,
      index: true,
    },

    purchasePrice: {
      type: Number,
      required: [true, 'Purchase price is required.'],
      min: [0, 'Purchase price cannot be negative.'],
    },

    sellingPrice: {
      type: Number,
      required: [true, 'Selling price is required.'],
      min: [0, 'Selling price cannot be negative.'],
    },

    stock: {
      type: Number,
      required: [true, 'Stock quantity is required.'],
      min: [0, 'Stock cannot be negative.'],
      default: 0,
      index: true,
    },

    image: {
      type: String,
      required: [true, 'Product image is required.'],
      trim: true,
    },

    imagePublicId: {
      type: String,
      required: [true, 'Cloudinary public id is required.'],
      trim: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

/**
 * Compound Index
 */
productSchema.index({
  name: 'text',
  sku: 'text',
  category: 'text',
});

/**
 * Static Method
 */
productSchema.statics.isProductExistsBySku = async function (
  sku: string,
): Promise<IProductDocument | null> {
  return this.findOne({
    sku: sku.toUpperCase(),
    isDeleted: false,
  });
};

/**
 * Export Model
 */
const Product = model<IProduct, IProductModel>('Product', productSchema);

export default Product;
