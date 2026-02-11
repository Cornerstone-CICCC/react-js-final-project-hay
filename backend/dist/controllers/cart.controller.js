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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_service_1 = __importDefault(require("../services/cart.service"));
// Get all carts
const getAllCarts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield cart_service_1.default.getAll();
        if (!carts) {
            res.status(500).json({ message: "Unable to find carts" });
            return;
        }
        res.status(200).json(carts);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error!" });
    }
});
//get a cart by id
// Get cart by userId
const getCartByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItems = yield cart_service_1.default.getUserCartWithItems(req.params.id);
        if (!cartItems) {
            res.status(401).json({
                message: "Empty cart",
            });
            return;
        }
        res.status(200).json(cartItems);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// Deactivate the cart - when you place an order/checkout
const deactivateCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId, userId } = req.body;
    try {
        const inactiveCart = yield cart_service_1.default.deactivate(cartId);
        const newCart = yield cart_service_1.default.add(userId);
        res.status(200).json({
            inactiveCart,
            newCart,
            message: "Deactive the cart and create a new one",
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = {
    getAllCarts,
    getCartByUserId,
    deactivateCart,
};
