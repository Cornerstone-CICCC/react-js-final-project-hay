"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cartItem_model_1 = require("../models/cartItem.model");
// Get all cartItems by cartId
const getItems = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    const cartItems = yield cartItem_model_1.CartItem.find({ cartId }).populate("productId");
    return cartItems;
});
// Add item into the cart
const updateItem = (cartId, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const addedItem = yield cartItem_model_1.CartItem.findOneAndUpdate({ cartId, productId }, { quantity }, { new: true, upsert: true });
    return addedItem;
});
// Delete item from the cart by id
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cartItem_model_1.CartItem.findByIdAndDelete(id);
});
exports.default = {
    getItems,
    updateItem,
    remove,
};
