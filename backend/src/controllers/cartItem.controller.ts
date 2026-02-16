import { Request, Response } from "express";
import cartItemService from "../services/cartItem.service";
import { CartItemDTO } from "../types/AddCartItemDTO";

// get cartItems, products by cartId - send the cartId as request param
const getCartItemWithProducts = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const cartId = req.params.id;
    const itemsAndProducts = await cartItemService.getItems(cartId);
    if (!itemsAndProducts) {
      res.status(401).json({
        message: "No items in your cart",
      });
    }
    res.status(200).json(itemsAndProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// add/update cart item into the cart
const updateItemToCart = async (
  req: Request<{}, {}, CartItemDTO>,
  res: Response,
) => {
  const { cartId, productId, quantity } = req.body;

  try {
    const addItem = await cartItemService.updateItem(
      cartId,
      productId,
      quantity,
    );
    if (!addItem) {
      res.status(500).json({ message: "Unable to add items" });
      return;
    }
    res.status(201).json(addItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// delete cart item from the cart
const deleteItemFromCart = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const deletedItem = await cartItemService.remove(req.params.id);
    res.status(200).json(deletedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getCartItemWithProducts,
  updateItemToCart,
  deleteItemFromCart,
};
