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
const cartItem_service_1 = __importDefault(require("../services/cartItem.service"));
// get cartItems, products by cartId - send the cartId as request param
const getCartItemWithProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartId = req.params.id;
        const itemsAndProducts = yield cartItem_service_1.default.getItems(cartId);
        if (!itemsAndProducts) {
            res.status(401).json({
                message: "No items in your cart",
            });
        }
        res.status(200).json(itemsAndProducts);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// add/update cart item into the cart
const updateItemToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId, productId, quantity } = req.body;
    try {
        const addItem = yield cartItem_service_1.default.updateItem(cartId, productId, quantity);
        if (!addItem) {
            res.status(500).json({ message: "Unable to add items" });
            return;
        }
        res.status(201).json(addItem);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// delete cart item from the cart
const deleteItemFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedItem = yield cartItem_service_1.default.remove(req.params.id);
        res.status(200).json(deletedItem);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = {
    getCartItemWithProducts,
    updateItemToCart,
    deleteItemFromCart,
};
