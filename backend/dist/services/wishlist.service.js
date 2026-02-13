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
const product_model_1 = require("../models/product.model");
// Get all wish items
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield wishlist_model_1.Wishlist.find();
});
// Get all wishlist by userId
const getByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const wishItems = yield wishlist_model_1.Wishlist.find({ userId })
        .populate("productId", "image name price")
        .select("-userId -createdAt -updatedAt -__v")
        .lean();
    return wishItems.map((item) => ({
        wishlistId: item._id,
        productId: item.productId._id,
        image: item.productId.image,
        name: item.productId.name,
        price: item.productId.price,
    }));
});
// Get the number of product by productId and product detail
const getNumProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const productNum = yield wishlist_model_1.Wishlist.countDocuments({ productId });
    const productDetail = yield product_model_1.Product.findById(productId).select("-userId -createdAt -updatedAt -__v");
    return {
        productNum,
        productDetail,
    };
});
// Add item to wishlist
const add = (newItem) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield wishlist_model_1.Wishlist.exists({
        userId: newItem.userId,
        productId: newItem.productId,
    });
    if (exists)
        return;
    const created = yield wishlist_model_1.Wishlist.create(newItem);
    return yield wishlist_model_1.Wishlist.findById(created._id)
        .populate("productId", "image name price")
        .select("-userId -createdAt -updatedAt -__v")
        .lean();
});
// Remove item from wishlist
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield wishlist_model_1.Wishlist.findByIdAndDelete(id);
});
exports.default = {
    getAll,
    getByUserId,
    getNumProduct,
    add,
    remove,
};
