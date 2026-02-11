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
const product_model_1 = require("../models/product.model");
// Get all products
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.find();
});
//Get product by id
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findById(id);
});
// Add product
const add = (newProduct) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.create(newProduct);
});
// Update product by id
const update = (id, details) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findByIdAndUpdate(id, details, {
        new: true,
    });
});
// remove product by id
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findByIdAndDelete(id);
});
exports.default = {
    getAll,
    getById,
    add,
    update,
    remove,
};
