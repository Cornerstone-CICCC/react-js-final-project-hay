import mongoose from "mongoose";
import { Wishlist } from "../models/wishlist.model";
import { Product } from "../models/product.model";

export interface WishlistDTO {
  userId: string;
  productId: string;
}

// Get all wish items
const getAll = async () => {
  return await Wishlist.find();
};

// Get all wishlist by userId
const getByUserId = async (userId: string) => {
  const wishItems = await Wishlist.find({ userId })
    .populate("productId", "image name price")
    .select("-userId -createdAt -updatedAt -__v")
    .lean<
      {
        _id: mongoose.Types.ObjectId;
        productId: {
          _id: mongoose.Types.ObjectId;
          image: string;
          name: string;
          price: number;
        };
      }[]
    >();

  return wishItems.map((item) => ({
    wishlistId: item._id,
    productId: item.productId._id,
    image: item.productId.image,
    name: item.productId.name,
    price: item.productId.price,
  }));
};

// Get the number of product by productId and product detail
const getNumProduct = async (productId: string) => {
  const productNum = await Wishlist.countDocuments({ productId });

  const productDetail = await Product.findById(productId).select(
    "-userId -createdAt -updatedAt -__v",
  );

  return {
    productNum,
    productDetail,
  };
};

// Add item to wishlist
const add = async (newItem: WishlistDTO) => {
  return await Wishlist.create(newItem);
};

// Remove item from wishlist
const remove = async (id: string) => {
  return await Wishlist.findByIdAndDelete(id);
};

export default {
  getAll,
  getByUserId,
  getNumProduct,
  add,
  remove,
};
