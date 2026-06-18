import mongoose from "mongoose";
import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

// ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const { name, price, category, description, stock, material, occasion } = req.body;
    let imageUrl = "";

    if (req.file) {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
      imageUrl = uploadResponse.secure_url;
    }

    if (!name || !price || !category) {
      return res.status(400).json({ success: false, message: "Name, price and category are required" });
    }

    const product = new Product({
      name, price: Number(price), category,
      image: imageUrl, description, stock: Number(stock) || 0,
      material, occasion
    });

    await product.save();
    res.json({ success: true, message: "Product Added", product });
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};

// GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { name, price, category, description, stock, material, occasion } = req.body;
    const updateData = {
      name, price: Number(price), category,
      description, stock: Number(stock) || 0, material, occasion
    };

    if (req.file) {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
      updateData.image = uploadResponse.secure_url;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, message: "Product Updated", updated });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET RELATED PRODUCTS
export const getRelatedProducts = async (req, res) => {
  try {
    const { category, id } = req.params;
    const products = await Product.find({
      category: category,
      _id: { $ne: id }
    }).limit(4);
    res.json(products);
  } catch (error) {
    console.error("RELATED ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
