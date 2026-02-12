import { Router } from "express";
import wishlistController from "../controllers/wishlist.controller";

const wishlistRouter = Router();

wishlistRouter.get("/", wishlistController.getAllItems);
wishlistRouter.post("/", wishlistController.addWishItem);
wishlistRouter.get("/:id", wishlistController.getAllWishlist);
wishlistRouter.delete("/:id", wishlistController.deleteWishItem);
wishlistRouter.get("/numproduct/:id", wishlistController.numberProduct);

export default wishlistRouter;
