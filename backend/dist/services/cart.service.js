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
const cart_model_1 = require("../models/cart.model");
const cartItem_model_1 = require("../models/cartItem.model");
// return all cart items
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.find();
});
//return cartId, cartItems, products by cartId
const getUserCartWithItems = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.Cart.findOne({ userId, status: "active" });
    if (!cart)
        return [];
    const cartItems = yield cartItem_model_1.CartItem.find({ cartId: cart._id })
        .populate("productId", "name price image stock")
        .select("-__v -createdAt -updatedAt")
        .lean();
    return cartItems.map((item) => ({
        cartItemId: item._id,
        productId: item.productId._id,
        image: item.productId.image,
        name: item.productId.name,
        price: item.productId.price,
        stock: item.productId.stock,
        cartId: item.cartId,
        quantity: item.quantity,
    }));
});
// create a cart
const add = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.create({ userId, status: "active" });
});
// set the cart to inactive by id
const deactivate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
});
exports.default = {
    getAll,
    getUserCartWithItems,
    add,
    deactivate,
};
