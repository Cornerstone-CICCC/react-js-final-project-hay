import { IProduct, Product } from "../models/product.model";

// Get all products
const getAll = async () => {
  return await Product.find();
};

//Get product by id
const getById = async (id: string) => {
  return await Product.findById(id);
};

// Add product
const add = async (newProduct: Partial<IProduct>) => {
  return await Product.create(newProduct);
};

// Update product by id
const update = async (id: string, details: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, details, {
    new: true,
  });
};

// remove product by id
const remove = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export default {
  getAll,
  getById,
  add,
  update,
  remove,
};
