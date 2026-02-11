import { Router } from "express";
import cartItemController from "../controllers/cartItem.controller";

const cartItemRouter = Router();

cartItemRouter.post("/update", cartItemController.updateItemToCart);
cartItemRouter.delete("/:id", cartItemController.deleteItemFromCart);
cartItemRouter.get("/:id", cartItemController.getCartItemWithProducts);

export default cartItemRouter;
