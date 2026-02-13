import { CartItem, ICartItem } from "../models/cartItem.model";

// Get all cartItems by cartId
const getItems = async (cartId: string) => {
  const cartItems = await CartItem.find({ cartId }).populate("productId");

  return cartItems;
};

// Add item into the cart
const updateItem = async (
  cartId: string,
  productId: string,
  quantity: number,
) => {
  const addedItem = await CartItem.findOneAndUpdate(
    { cartId, productId },
    { quantity },
    { new: true, upsert: true },
  ).populate("productId", "name price image stock");

  return addedItem;
};

// Delete item from the cart by id
const remove = async (id: string) => {
  return await CartItem.findByIdAndDelete(id);
};

export default {
  getItems,
  updateItem,
  remove,
};
