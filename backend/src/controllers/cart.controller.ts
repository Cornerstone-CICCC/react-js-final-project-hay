import { Request, Response } from "express";
import cartService from "../services/cart.service";

interface deactiveDTO {
  cartId: string;
  userId: string;
}

// Get all carts
const getAllCarts = async (req: Request, res: Response) => {
  try {
    const carts = await cartService.getAll();

    if (!carts) {
      res.status(500).json({ message: "Unable to find carts" });
      return;
    }

    res.status(200).json(carts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error!" });
  }
};

//get a cart by id

// Get cart by userId
const getCartByUserId = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const cartItems = await cartService.getUserCartWithItems(req.params.id);

    if (!cartItems) {
      res.status(401).json({
        message: "Empty cart",
      });
      return;
    }

    res.status(200).json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Deactivate the cart - when you place an order/checkout
const deactivateCart = async (
  req: Request<{}, {}, deactiveDTO>,
  res: Response,
) => {
  const { cartId, userId } = req.body;

  try {
    const inactiveCart = await cartService.deactivate(cartId);

    const newCart = await cartService.add(userId);

    res.status(200).json({
      inactiveCart,
      newCart,
      message: "Deactive the cart and create a new one",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getAllCarts,
  getCartByUserId,
  deactivateCart,
};
