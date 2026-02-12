import { Router } from "express";
import wishlistController from "../controllers/wishlist.controller";

const wishlistRouter = Router();

wishlistRouter.post("/", wishlistController.addWishItem);
wishlistRouter.get("/:id", wishlistController.getAllWishlist);
wishlistRouter.delete("/:id", wishlistController.deleteWishItem);

export default wishlistRouter;
