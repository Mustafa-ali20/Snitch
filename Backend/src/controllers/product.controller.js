import asyncHandler from "express-async-handler";
import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, priceAmount, priceCurrency, category } = req.body;

  const images = await Promise.all(
    req.files.map(async (file) => {
      const result = await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
      });
      return { url: result.url };
    }),
  );

  const product = await productModel.create({
    title,
    description,
    price: {
      amount: priceAmount,
      currency: priceCurrency || "KWD",
    },
    images,
    createdBy: req.user._id,
    category: req.user._id,
  });

  res.status(201).json({
    message: "Product created successfully",
    success: true,
    product,
  });
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productModel.find();

  res.status(200).json({
    message: "Products fetched successfully",
    success: true,
    products,
  });
});
