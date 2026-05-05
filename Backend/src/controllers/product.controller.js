import asyncHandler from "express-async-handler";
import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price } = req.body;
  const seller = req.body;

  const images = await Promise.all(
    req.files.map(async (file) => {
      return await uploadFile({
        buffer: file.buffer,
        fileName: file.originalName,
      });
    }),
  );

  const product = productModel.create({
    title,
    description,
    price: {
      amount: price,
      currency: "KWD",
    },
    images,
    seller: seller._id,
  });

  res.status(201).json({
    message: "product created successfully",
    success: true,
    product,
  });
});
