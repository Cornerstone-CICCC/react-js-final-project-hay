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
const wishlist_service_1 = __importDefault(require("../services/wishlist.service"));
// Get wishlist by userId
const getAllWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wishItems = yield wishlist_service_1.default.getByUserId(req.params.id);
        if (!wishItems) {
            res.status(400).json({
                message: "Not found wish items",
            });
        }
        res.status(200).json(wishItems);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
const addWishItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.body;
    try {
        const addItem = yield wishlist_service_1.default.add({ userId, productId });
        if (!addItem) {
            res.status(500).json({ message: "Unable to add" });
            return;
        }
        res.status(201).json(addItem);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
const deleteWishItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteItem = yield wishlist_service_1.default.remove(req.params.id);
        res.status(200).json({
            message: "Successfully deleted!",
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = {
    getAllWishlist,
    addWishItem,
    deleteWishItem,
};
