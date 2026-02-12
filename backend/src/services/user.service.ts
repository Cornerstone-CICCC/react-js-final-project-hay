import { IUser, User } from "../models/user.model";
import bcrypt from "bcrypt";
import { ILoginDTO } from "../types/loginDTO";

// Get all users
const getAll = async () => {
  return await User.find();
};

//Get user by id
const getById = async (id: string) => {
  return await User.findById(id);
};

// Get user by email
const getByEmail = async (email: string) => {
  return await User.findOne({
    email: {
      $regex: email,
    },
  }).select("+password");
};

//Add new user
const add = async (newUser: Partial<IUser>) => {
  const { firstname, lastname, email, password } = newUser;
  if (!firstname || !lastname || !email || !password) return false;

  // check if the email already exists
  const foundUser = await getByEmail(email);
  if (foundUser) return false;

  const hashedPassword = await bcrypt.hash(password, 12);

  return await User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
};

//Update user
const update = async (id: string, updatedUser: Partial<IUser>) => {
  return await User.findByIdAndUpdate(id, updatedUser, {
    new: true,
  });
};

// Delete User
const remove = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

// Login user
const login = async (details: ILoginDTO) => {
  const { email, password } = details;
  const foundUser = await getByEmail(email);
  if (!foundUser) return false;

  const isMatch = await bcrypt.compare(password, foundUser.password);
  if (!isMatch) return false;

  return foundUser;
};

export default {
  getAll,
  getById,
  getByEmail,
  add,
  update,
  remove,
  login,
};
