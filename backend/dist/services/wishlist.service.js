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
const wishlist_model_1 = require("../models/wishlist.model");
// Get all wishlist by userId
const getByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield wishlist_model_1.Wishlist.find({ userId }).populate("productId");
});
// Add item to wishlist
const add = (newItem) => __awaiter(void 0, void 0, void 0, function* () {
    return yield wishlist_model_1.Wishlist.create(newItem);
});
// Remove item from wishlist
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield wishlist_model_1.Wishlist.findByIdAndDelete(id);
});
exports.default = {
    getByUserId,
    add,
    remove,
};
