"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartItem_controller_1 = __importDefault(require("../controllers/cartItem.controller"));
const cartItemRouter = (0, express_1.Router)();
cartItemRouter.post("/update", cartItem_controller_1.default.updateItemToCart);
cartItemRouter.delete("/:id", cartItem_controller_1.default.deleteItemFromCart);
cartItemRouter.get("/:id", cartItem_controller_1.default.getCartItemWithProducts);
exports.default = cartItemRouter;
