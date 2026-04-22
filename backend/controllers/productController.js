// controllers/productController.js
import mongoose from "mongoose";
import Product from "../models/productModel.js";
// ADD PRODUCT
import { v2 as cloudinary } from "cloudinary";

export const addProduct = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }
  try {
    const { name, price, category } = req.body;
    const image = req.file;
    const uploadResponse = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });
    const imageUrl = uploadResponse.secure_url;
    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Image required",
      });
    }
    const product = new Product({
      name,
      price: Number(price),
      category,
      image: imageUrl,
    });

    await product.save();

    res.json({
      success: true,
      message: "Product Added",
      product,
    });

  } catch (error) {
    console.error("🔥 ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
// GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PRODUCTS
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// DELETE
export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {

  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }
  try {
    const { name, price, category } = req.body;
    const image = req.file;
    const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });
    const imageUrl = uploadResponse.secure_url;
    const updateData = {
      name,
      price: Number(price),
      category,
      image: imageUrl,
    };



    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    await updated.save();

    res.json({
      success: true,
      message: "Product Updated ✅",
      updated,
    });

  } catch (error) {
    console.error("🔥 UPDATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET RELATED PRODUCTS
export const getRelatedProducts = async (req, res) => {
  try {
    const { category, id } = req.params;

    // ✅ Validate ID (important)
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: "Invalid product ID" });
    // }

    // const products = await Product.find({
    //   category: { $regex: new RegExp(`^${category}$`, "i") },
    //   _id: { $ne: new mongoose.Types.ObjectId(id) }
    // }).limit(4);
    const currentProduct = await Product.findById(id);

    const products = await Product.find({
      category: currentProduct.category,
      _id: { $ne: id }
    }).limit(4);

    res.json(products);
  } catch (error) {
    console.error("RELATED ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};