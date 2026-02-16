import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import { Server } from "socket.io";
import { socketHandler } from "./sockets/connection.manager";
import userRouter from "./routes/user.route";
import productRouter from "./routes/product.route";
import cartItemRouter from "./routes/cartItem.route";
import cartRouter from "./routes/cart.route";
import wishlistRouter from "./routes/wishlist.route";

// Create server
const app = express();

const allowedOrigin = process.env.CLIENT_URL;

//Middleware
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);

if (!process.env.COOKIE_PRIMARY_KEY || !process.env.COOKIE_SECONDARY_KEY) {
  throw new Error("Missing cookie keys");
}

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_PRIMARY_KEY, process.env.COOKIE_SECONDARY_KEY],
  }),
);
app.use(express.json());

//Routes
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cartitems", cartItemRouter);
app.use("/carts", cartRouter);
app.use("/wishlists", wishlistRouter);
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server is running");
});

// Fallback / 404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Invalid Route");
});

// Create HTTP server and attach Socket.IO
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    credentials: true,
  },
});

//start server
const PORT = process.env.PORT;
const CONN_STRING = process.env.DATABASE_URI;
if (!PORT || !CONN_STRING) {
  throw new Error("Missing port or connecting string!");
}

// to see if you can connect to Mongoose
mongoose
  .connect(CONN_STRING, { dbName: "shine_studio" })
  .then(() => {
    console.log("connected to MongoDB!");
    console.log(process.env.CLIENT_URL);

    //Start Socket.IO
    socketHandler(io);

    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    throw err;
  });
