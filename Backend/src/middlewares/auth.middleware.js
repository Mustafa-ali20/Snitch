import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import userModel from "../models/user.model.js";

// Just checks if user is logged in
export const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await userModel.findById(decoded.id).select("-password");

  if (!user) {
    res.status(401);
    throw new Error("Not authorized, user not found");
  }

  req.user = user;
  next();
});

// Checks if logged in user is admin
export const adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized, admin only");
  }
});

