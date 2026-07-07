import { Schema, model } from "mongoose";

import { ISale, ISaleModel } from "./sale.interface";

const saleItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  },
);

const saleSchema = new Schema<ISale, ISaleModel>(
  {
    products: {
      type: [saleItemSchema],
      required: true,
    },

    grandTotal: {
      type: Number,
      required: true,
      min: 0,
    },

    soldBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Sale = model<ISale, ISaleModel>("Sale", saleSchema);

export default Sale;
