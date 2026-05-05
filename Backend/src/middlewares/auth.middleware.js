import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import userModel from "../models/user.model.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
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

  if (user.role !== "seller") {
    res.status(403);
    throw new Error("Forbidden");
  }

  req.user = user;
  next();
});

export default authMiddleware;
