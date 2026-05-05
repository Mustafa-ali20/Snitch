import express, { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import multer from "multer";
import { createProduct } from "../controllers/product.controller.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const productRoute = Router();

productRoute.post(
  "/product",
  authMiddleware,
  upload.array("images", 7),
  createProduct,
);

export default productRoute;
