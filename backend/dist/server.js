"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const connection_manager_1 = require("./sockets/connection.manager");
const user_route_1 = __importDefault(require("./routes/user.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const cartItem_route_1 = __importDefault(require("./routes/cartItem.route"));
const cart_route_1 = __importDefault(require("./routes/cart.route"));
const wishlist_route_1 = __importDefault(require("./routes/wishlist.route"));
// Create server
const app = (0, express_1.default)();
//Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
if (!process.env.COOKIE_PRIMARY_KEY || !process.env.COOKIE_SECONDARY_KEY) {
    throw new Error("Missing cookie keys");
}
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: [process.env.COOKIE_PRIMARY_KEY, process.env.COOKIE_SECONDARY_KEY],
}));
app.use(express_1.default.json());
//Routes
app.use("/users", user_route_1.default);
app.use("/products", product_route_1.default);
app.use("/cartitems", cartItem_route_1.default);
app.use("/carts", cart_route_1.default);
app.use("/wishlists", wishlist_route_1.default);
app.get("/", (req, res) => {
    res.status(200).send("Server is running");
});
// Fallback / 404
app.use((req, res, next) => {
    res.status(404).send("Invalid Route");
});
// Create HTTP server and attach Socket.IO
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
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
mongoose_1.default
    .connect(CONN_STRING, { dbName: "shine_studio" })
    .then(() => {
    console.log("connected to MongoDB!");
    //Start Socket.IO
    (0, connection_manager_1.socketHandler)(io);
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error(err);
    throw err;
});
