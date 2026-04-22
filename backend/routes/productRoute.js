// routes/productRoute.js
import express from "express";
import { 
  addProduct, 
  getProducts, 
  deleteProduct, 
  getSingleProduct, 
  updateProduct,
  getRelatedProducts   // ✅ ADD THIS
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// ✅ FIRST (before :id)
router.get("/related/:category/:id", getRelatedProducts);

// OTHER ROUTES
router.post("/add", upload.single("image"), addProduct);
router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);


export default router;