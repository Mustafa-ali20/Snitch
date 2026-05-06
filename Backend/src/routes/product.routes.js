import express, { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import multer from "multer";
import {
  createProduct,
  getSellerProducts,
} from "../controllers/product.controller.js";
import { get } from "mongoose";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const productRoute = Router();

productRoute.post(
  "/",
  authMiddleware,
  upload.array("images", 7),
  createProduct,
);

/**
 * @route POST /api/products/seller
 * @description Get all products of the authenticated seller
 * @access Private (Seller only)
 */

productRoute.get("/seller", authMiddleware, getSellerProducts);

export default productRoute;
