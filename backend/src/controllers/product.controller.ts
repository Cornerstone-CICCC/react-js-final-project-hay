import { Request, Response } from "express";
import productService from "../services/product.service";
import { IProduct } from "../models/product.model";

// Get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAll();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get product by id
const getProductById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const product = await productService.getById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add product
const addProduct = async (req: Request<{}, {}, IProduct>, res: Response) => {
  const { image, name, price, description, stock, category } = req.body;
  try {
    const newProduct = await productService.add({
      image,
      name,
      price,
      description,
      stock,
      category,
    });
    if (!newProduct) {
      res.status(500).json({ message: "Unable to add product" });
      return;
    }
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update product by id
const updateProduct = async (
  req: Request<{ id: string }, {}, Partial<IProduct>>,
  res: Response,
) => {
  const { image, name, price, description, stock, category } = req.body;

  try {
    const updatedProduct = await productService.update(req.params.id, {
      image,
      name,
      price,
      description,
      stock,
      category,
    });

    if (!updateProduct) {
      res.status(500).json({
        message: "Unable to update product",
      });
      return;
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product by id
const deleteProduct = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const deletedProduct = await productService.remove(req.params.id);
    if (!deletedProduct) {
      res.status(500).json({
        message: "Unable to delete product",
      });
      return;
    }
    res.status(200).json(deletedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
