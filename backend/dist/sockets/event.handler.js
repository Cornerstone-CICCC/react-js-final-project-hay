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
exports.handleSocketEvents = void 0;
const wishlist_service_1 = __importDefault(require("../services/wishlist.service"));
const shopProductUser = [];
const handleSocketEvents = (io, socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`User connected: ${socket.id}`);
    // show the top 4 items in the wishlist
    const trendingItems = yield wishlist_service_1.default.getTrend();
    console.log("trending Items", trendingItems);
    io.emit("initialTrending", trendingItems);
    // the number of people watching products
    // 1. productId
    // 2. userId
    socket.on("shopProduct", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { productId, userId } = data;
        // see if the same user watching the same product existed already in the array
        const checkUser = shopProductUser.find((p) => p.productId === productId && p.socketId === socket.id);
        // if that exists, return
        if (checkUser)
            return;
        // add the shopper into the array
        shopProductUser.push({ productId, userId, socketId: socket.id });
        emitCurrentCount(io, productId);
    }));
    // when the user leave
    // 1. productId
    socket.on("leaveProduct", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { productId } = data;
        //remove users from shopUser by socket id
        for (let i = shopProductUser.length - 1; i >= 0; i--) {
            if (shopProductUser[i].productId === productId &&
                shopProductUser[i].socketId === socket.id) {
                shopProductUser.splice(i, 1);
            }
        }
        emitCurrentCount(io, productId);
    }));
    // trending item - when client sends the wishlist add/remove request
    // 1. productId
    socket.on("updateWish", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { productId } = data;
        const results = yield wishlist_service_1.default.getNumProduct(productId);
        io.emit("ProductNumAndDetail", { productId, results });
    }));
    // remove the user from the array whne they disconnect
    socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`User disconnected: ${socket.id}`);
        // find all products this socket was watching
        const productsWatching = shopProductUser
            .filter((p) => p.socketId === socket.id)
            .map((p) => p.productId);
        if (productsWatching.length === 0)
            return;
        // remove all entries of this socketId for this product
        for (let i = shopProductUser.length - 1; i >= 0; i--) {
            if (shopProductUser[i].socketId === socket.id) {
                shopProductUser.splice(i, 1);
            }
        }
        // calculate the number of current user
        const uniqueProducts = [...new Set(productsWatching)];
        uniqueProducts.forEach((productId) => {
            emitCurrentCount(io, productId);
        });
    }));
});
exports.handleSocketEvents = handleSocketEvents;
function emitCurrentCount(io, productId) {
    const countShopper = new Set(shopProductUser
        .filter((shop) => shop.productId === productId)
        .map((p) => p.userId)).size;
    console.log({ productId, count: countShopper });
    io.emit("currentShoppers", { productId, count: countShopper });
}
