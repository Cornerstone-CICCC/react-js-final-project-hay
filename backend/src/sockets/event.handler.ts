import { Socket, Server } from "socket.io";

export const handleSocketEvents = (io: Server, socket: Socket) => {
  console.log(`User connected: ${socket.id}`);
};
