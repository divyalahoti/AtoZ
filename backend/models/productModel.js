import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, default: "Other" },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  stock: { type: Number, default: 0 },
  material: { type: String, default: "" },
  occasion: { type: String, default: "" },
  featured: { type: Boolean, default: false },
  ratings: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
