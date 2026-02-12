import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  image: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
}

const ProductSchema: Schema = new Schema(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    category: {
      type: String,
      enum: ["necklaces", "earrings", "rings", "bracelets", "anklewear"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
