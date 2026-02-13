import { Socket, Server } from "socket.io";
import { Wishlist } from "../models/wishlist.model";
import wishlistService from "../services/wishlist.service";

export interface socketDTO {
  productId: string;
  userId: string;
  socketId: string;
}

const shopProductUser: socketDTO[] = [];

export const handleSocketEvents = async (io: Server, socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  // show the top 4 items in the wishlist
  const trendingItems = await wishlistService.getTrend();
  console.log("trending Items", trendingItems);
  io.emit("initialTrending", trendingItems);

  // the number of people watching products
  // 1. productId
  // 2. userId
  socket.on("shopProduct", async (data) => {
    const { productId, userId } = data;

    // see if the same user watching the same product existed already in the array
    const checkUser = shopProductUser.find(
      (p) => p.productId === productId && p.socketId === socket.id,
    );
    // if that exists, return
    if (checkUser) return;

    // add the shopper into the array
    shopProductUser.push({ productId, userId, socketId: socket.id });

    emitCurrentCount(io, productId);
  });

  // when the user leave
  // 1. productId
  socket.on("leaveProduct", async (data) => {
    const { productId } = data;

    //remove users from shopUser by socket id
    for (let i = shopProductUser.length - 1; i >= 0; i--) {
      if (
        shopProductUser[i].productId === productId &&
        shopProductUser[i].socketId === socket.id
      ) {
        shopProductUser.splice(i, 1);
      }
    }

    emitCurrentCount(io, productId);
  });

  // trending item - when client sends the wishlist add/remove request
  // 1. productId
  socket.on("updateWish", async (data) => {
    const { productId } = data;

    const results = await wishlistService.getNumProduct(productId);

    io.emit("ProductNumAndDetail", { productId, results });
  });

  // remove the user from the array whne they disconnect
  socket.on("disconnect", async () => {
    console.log(`User disconnected: ${socket.id}`);

    // find all products this socket was watching
    const productsWatching = shopProductUser
      .filter((p) => p.socketId === socket.id)
      .map((p) => p.productId);

    if (productsWatching.length === 0) return;

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
  });
};

function emitCurrentCount(io: Server, productId: string) {
  const countShopper = new Set(
    shopProductUser
      .filter((shop) => shop.productId === productId)
      .map((p) => p.userId),
  ).size;

  console.log({ productId, count: countShopper });
  io.emit("currentShoppers", { productId, count: countShopper });
}
