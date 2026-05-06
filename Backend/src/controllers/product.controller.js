import asyncHandler from "express-async-handler";
import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, priceAmount, priceCurrency } = req.body;
  const seller = req.user;

  const images = await Promise.all(
    req.files.map(async (file) => {
      const result = await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
      });
      console.log(result); // check terminal to confirm field name
      return { url: result.url }; // ✅ single return
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
    seller: seller._id,
  });

  res.status(201).json({
    message: "product created successfully",
    success: true,
    product,
  });
});

export const getSellerProducts = asyncHandler(async (req, res) => {
  const seller = req.user;

  const products = await productModel.find({ seller: seller._id });

  res.status(200).json({
    message: "Products fetched successfully",
    success: true,
    products,
  });
});

