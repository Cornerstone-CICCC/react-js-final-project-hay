import { Router } from "express";
import cartController from "../controllers/cart.controller";

const cartRouter = Router();

cartRouter.get("/", cartController.getAllCarts);
cartRouter.post("/inactive", cartController.deactivateCart);
cartRouter.get("/:id", cartController.getCartByUserId);

export default cartRouter;
