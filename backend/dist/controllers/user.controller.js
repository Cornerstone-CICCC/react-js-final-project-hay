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
const user_service_1 = __importDefault(require("../services/user.service"));
const zxcvbn_1 = __importDefault(require("zxcvbn"));
const cart_service_1 = __importDefault(require("../services/cart.service"));
const wishlist_service_1 = __importDefault(require("../services/wishlist.service"));
//Get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.default.getAll();
        if (!users) {
            res.status(500).json({
                message: "Unable to find users",
            });
            return;
        }
        res.status(200).json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error!" });
    }
});
//Get user by id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.default.getById(req.params.id);
        if (!user) {
            res.status(404).json({
                message: "User not found!",
            });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// get user by email
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield user_service_1.default.getByEmail(email);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});
// Check auth - when the user go on login page, if they're already logged in, you will directly load main page
const checkAuth = (req, res) => {
    if (!req.session || !req.session.isLoggedIn || !req.session.email) {
        res.status(401).json({
            message: "You are not allowed to access this.",
        });
        return;
    }
    else {
        res.status(200).json(req.session.email);
    }
};
//Sign up
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password } = req.body;
    try {
        if (!firstname.trim() ||
            !lastname.trim() ||
            !email.trim() ||
            !password.trim()) {
            res.status(500).json({
                message: "Missing informations",
            });
            return;
        }
        //password strength checker
        const strength = (0, zxcvbn_1.default)(password);
        if (strength.score < 3) {
            return res.status(400).json({
                message: "Password is too weak",
            });
        }
        const newUser = yield user_service_1.default.add({
            firstname,
            lastname,
            email,
            password,
        });
        if (!newUser) {
            res.status(400).json({
                message: "Unable to create User",
            });
            return;
        }
        // set the cookies so the user can directly go on to the main page
        if (req.session) {
            req.session.isLoggedIn = true;
            req.session.userId = newUser._id;
            console.log(req.session.userId);
        }
        // create a new cart
        const cart = yield cart_service_1.default.add(newUser.id);
        // const userId = newUser.id
        // const firstname = newUser.firstname
        // const cartId = cart.id
        res.status(201).json({ newUser, cart });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
//Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email.trim() || !password.trim()) {
            res.status(400).json({
                message: "Id or Password is empty!",
            });
            return;
        }
        // User Info
        const foundUser = yield user_service_1.default.login({ email, password });
        if (!foundUser) {
            res.status(401).json({
                message: "Invalid credentials!",
            });
            return;
        }
        if (req.session) {
            req.session.isLoggedIn = true;
            req.session.userId = foundUser._id;
            console.log(req.session.userId);
        }
        const cartId = yield cart_service_1.default.getByUserId(foundUser.id);
        // Cart Items
        const cartItems = yield cart_service_1.default.getUserCartWithItems(foundUser.id);
        // Wishlist Items
        const wishlist = yield wishlist_service_1.default.getByUserId(foundUser.id);
        res.status(200).json({
            message: "Login successful",
            user: {
                userId: foundUser.id,
                firstname: foundUser.firstname,
            },
            cartId,
            cartItems,
            wishlist,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// Log out
const logout = (req, res) => {
    if (req.session) {
        req.session = null;
    }
    res.status(200).json({
        message: "Logout successful",
    });
};
// Update user by id
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password } = req.body;
    try {
        const updatedUser = yield user_service_1.default.update(req.params.id, {
            firstname,
            lastname,
            email,
            password,
        });
        if (!updatedUser) {
            res.status(404).json({
                message: "User not found!",
            });
            return;
        }
        res.status(200).json(updatedUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
//Delete user by id
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_service_1.default.remove(req.params.id);
        if (!deletedUser) {
            res.status(404).json({
                message: "User not found",
            });
            return;
        }
        res.status(200).json(deletedUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    checkAuth,
    addUser,
    updateUserById,
    deleteUserById,
    login,
    logout,
};
