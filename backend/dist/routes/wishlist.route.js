"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlist_controller_1 = __importDefault(require("../controllers/wishlist.controller"));
const wishlistRouter = (0, express_1.Router)();
wishlistRouter.get("/", wishlist_controller_1.default.getAllItems);
wishlistRouter.post("/", wishlist_controller_1.default.addWishItem);
wishlistRouter.get("/:id", wishlist_controller_1.default.getAllWishlist);
wishlistRouter.delete("/:id", wishlist_controller_1.default.deleteWishItem);
wishlistRouter.get("/numproduct/:id", wishlist_controller_1.default.numberProduct);
exports.default = wishlistRouter;
