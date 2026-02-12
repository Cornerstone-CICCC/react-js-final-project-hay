import { Request, Response } from "express";
import wishlistService, { WishlistDTO } from "../services/wishlist.service";

// Get wishlist by userId
const getAllWishlist = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const wishItems = await wishlistService.getByUserId(req.params.id);
    if (!wishItems) {
      res.status(400).json({
        message: "Not found wish items",
      });
    }
    res.status(200).json(wishItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const addWishItem = async (req: Request<{}, WishlistDTO>, res: Response) => {
  const { userId, productId } = req.body;

  try {
    const addItem = await wishlistService.add({ userId, productId });
    if (!addItem) {
      res.status(500).json({ message: "Unable to add" });
      return;
    }
    res.status(201).json(addItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteWishItem = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const deleteItem = await wishlistService.remove(req.params.id);
    res.status(200).json({
      message: "Successfully deleted!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getAllWishlist,
  addWishItem,
  deleteWishItem,
};
