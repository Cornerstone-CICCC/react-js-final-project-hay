import { Server } from "socket.io";
import { handleSocketEvents } from "./event.handler";

export const socketHandler = (io: Server) => {
  io.on("connection", (socket) => {
    handleSocketEvents(io, socket);
  });
};
