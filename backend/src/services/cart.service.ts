import { Cart } from "../models/cart.model";
import { CartItem } from "../models/cartItem.model";

// return all cart items
const getAll = async () => {
  return await Cart.find();
};

//return cartId, cartItems, products by cartId
const getUserCartWithItems = async (userId: string) => {
  const cart = await Cart.findOne({ userId, status: "active" });

  if (!cart) return [];

  return await CartItem.find({ cartId: cart._id }).populate("productId");
};

// create a cart
const add = async (userId: string) => {
  return await Cart.create({ userId, status: "active" });
};

// set the cart to inactive by id
const deactivate = async (id: string) => {
  return await Cart.findByIdAndUpdate(
    id,
    { status: "inactive" },
    { new: true },
  );
};

export default {
  getAll,
  getUserCartWithItems,
  add,
  deactivate,
};
