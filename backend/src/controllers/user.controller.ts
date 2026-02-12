import { Request, Response } from "express";
import userService from "../services/user.service";
import { IUser } from "../models/user.model";
import { ILoginDTO } from "../types/loginDTO";
import zxcvbn from "zxcvbn";
import cartService from "../services/cart.service";
import { Cart } from "../models/cart.model";
import wishlistService from "../services/wishlist.service";

//Get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAll();
    if (!users) {
      res.status(500).json({
        message: "Unable to find users",
      });
      return;
    }
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error!" });
  }
};

//Get user by id
const getUserById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const user = await userService.getById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "User not found!",
      });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// get user by email
const getUserByEmail = async (
  req: Request<{}, {}, { email: string }>,
  res: Response,
) => {
  try {
    const { email } = req.body;
    const user = await userService.getByEmail(email);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Check auth - when the user go on login page, if they're already logged in, you will directly load main page
const checkAuth = (req: Request, res: Response) => {
  if (!req.session || !req.session.isLoggedIn || !req.session.email) {
    res.status(401).json({
      message: "You are not allowed to access this.",
    });
    return;
  } else {
    res.status(200).json(req.session.email);
  }
};

//Sign up
const addUser = async (req: Request<{}, {}, IUser>, res: Response) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      res.status(500).json({
        message: "Missing informations",
      });
      return;
    }

    //password strength checker
    const strength = zxcvbn(password);

    if (strength.score < 3) {
      return res.status(400).json({
        message: "Password is too weak",
      });
    }

    const newUser = await userService.add({
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
    const cart = await cartService.add(newUser.id);

    // const userId = newUser.id
    // const firstname = newUser.firstname
    // const cartId = cart.id

    res.status(201).json({ newUser, cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Login
const login = async (req: Request<{}, {}, ILoginDTO>, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email.trim() || !password.trim()) {
      res.status(400).json({
        message: "Id or Password is empty!",
      });
      return;
    }

    // User Info
    const foundUser = await userService.login({ email, password });
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

    // Cart Items
    const cartItems = await cartService.getUserCartWithItems(foundUser.id);

    // Wishlist Items
    const wishlist = await wishlistService.getByUserId(foundUser.id);

    res.status(200).json({
      message: "Login successful",
      user: {
        userId: foundUser.id,
        firstname: foundUser.firstname,
      },
      cartItems,
      wishlist,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Log out
const logout = (req: Request, res: Response) => {
  if (req.session) {
    req.session = null;
  }
  res.status(200).json({
    message: "Logout successful",
  });
};

// Update user by id
const updateUserById = async (
  req: Request<{ id: string }, Partial<IUser>>,
  res: Response,
) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const updatedUser = await userService.update(req.params.id, {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Delete user by id
const deleteUserById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const deletedUser = await userService.remove(req.params.id);
    if (!deletedUser) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    res.status(200).json(deletedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
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
