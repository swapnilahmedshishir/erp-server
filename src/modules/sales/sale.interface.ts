import { HydratedDocument, Model, Types } from "mongoose";

export interface ISaleItem {
  product: Types.ObjectId;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface ISale {
  products: ISaleItem[];

  grandTotal: number;

  soldBy: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateSale {
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
}

export type ISaleDocument = HydratedDocument<ISale>;

export interface ISaleModel extends Model<ISale> {}
