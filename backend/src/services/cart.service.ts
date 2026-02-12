import mongoose from "mongoose";
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

  const cartItems = await CartItem.find({ cartId: cart._id })
    .populate("productId", "name price image stock")
    .select("-__v -createdAt -updatedAt")
    .lean<
      {
        _id: mongoose.Types.ObjectId;
        productId: {
          _id: mongoose.Types.ObjectId;
          image: string;
          name: string;
          price: number;
          stock: number;
        };
        cartId: mongoose.Types.ObjectId;
        quantity: number;
      }[]
    >();

  return cartItems.map((item) => ({
    cartItemId: item._id,
    productId: item.productId._id,
    image: item.productId.image,
    name: item.productId.name,
    price: item.productId.price,
    stock: item.productId.stock,
    cartId: item.cartId,
    quantity: item.quantity,
  }));
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
