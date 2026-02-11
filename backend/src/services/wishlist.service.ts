import { Wishlist } from "../models/wishlist.model";

export interface WishlistDTO {
  userId: string;
  productId: string;
}

// Get all wishlist by userId
const getByUserId = async (userId: string) => {
  return await Wishlist.find({ userId }).populate("productId");
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
  getByUserId,
  add,
  remove,
};
