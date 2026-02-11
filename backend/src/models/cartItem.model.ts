import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem extends Document {
  cartId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

const CartItemSchema: Schema = new Schema(
  {
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

CartItemSchema.index({ cartId: 1, productId: 1 }, { unique: true });

export const CartItem = mongoose.model<ICartItem>("CartItem", CartItemSchema);
