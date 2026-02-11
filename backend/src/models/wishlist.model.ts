import mongoose, { Schema, Document } from "mongoose";

export interface IWishlist extends Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
}

const WishlistSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Wishlist = mongoose.model<IWishlist>("Wishlist", WishlistSchema);
