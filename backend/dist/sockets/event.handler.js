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
exports.handleSocketEvents = void 0;
const shopProductUser = [];
const handleSocketEvents = (io, socket) => {
    console.log(`User connected: ${socket.id}`);
    // the number of people watching products
    // 1. productId
    // 2. userId
    socket.on("shopProduct", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { productId, userId } = data;
        // see if the same user watching the same product existed already in the array
        const checkUser = shopProductUser.find((p) => p.productId === productId &&
            p.userId === userId &&
            p.socketId === socket.id);
        // if that exists, return
        if (checkUser)
            return;
        // add the shopper into the array
        shopProductUser.push({ productId, userId, socketId: socket.id });
        const countShopper = shopProductUser.filter((shop) => shop.productId === productId).length;
        console.log({ productId, count: countShopper });
        io.emit("currentShoppers", { productId, count: countShopper });
    }));
    // when the user leave
    // 1. productId
    // 2. userId
    socket.on("leaveProduct", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { productId, userId } = data;
        // see if the array has the specific user
        const checkUser = shopProductUser.find((p) => p.productId === productId &&
            p.userId === userId &&
            p.socketId === socket.id);
        // if the array doesn't have
        if (!checkUser)
            return;
        const index = shopProductUser.findIndex((shop) => shop.productId === productId &&
            shop.userId === userId &&
            shop.socketId === socket.id);
        if (index !== -1) {
            shopProductUser.splice(index, 1);
        }
        const countShopper = shopProductUser.filter((p) => p.productId === productId).length;
        console.log("currentShoppers", { productId, count: countShopper });
        io.emit("currentShoppers", { productId, count: countShopper });
    }));
    // remove the user from the array whne they disconnect
    socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`User disconnected: ${socket.id}`);
        // find all products this socket was watching
        const productsWatching = shopProductUser.filter((p) => p.socketId === socket.id);
        if (productsWatching.length === 0)
            return;
        productsWatching.forEach(({ productId }) => {
            // remove all entries of this socketId for this product
            for (let i = shopProductUser.length - 1; i >= 0; i--) {
                if (shopProductUser[i].socketId === socket.id &&
                    shopProductUser[i].productId === productId) {
                    shopProductUser.splice(i, 1);
                }
            }
            // count current shoppers for this product
            const countShopper = shopProductUser.filter((p) => p.productId === productId).length;
            console.log("currentShoppers", { productId, count: countShopper });
            // emit the updated count to all clients
            io.emit("currentShoppers", { productId, count: countShopper });
        });
    }));
};
exports.handleSocketEvents = handleSocketEvents;
