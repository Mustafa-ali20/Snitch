import { Router } from "express";
import { authMiddleware, adminOnly } from "../middlewares/auth.middleware.js";
import multer from "multer";
import {
  createProduct,
  getAllProducts,
} from "../controllers/product.controller.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const productRoute = Router();

// Public - anyone can see products
productRoute.get("/", getAllProducts);

// Admin only - create product
productRoute.post(
  "/",
  authMiddleware,
  adminOnly,
  upload.array("images", 7),
  createProduct,
);

export default productRoute;
