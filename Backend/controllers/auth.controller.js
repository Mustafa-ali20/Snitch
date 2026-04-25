import userModel from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import { config } from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function sendTokenResponse(user, res, message) {
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" },
  );
}

export const register = asyncHandler(async (req, res) => {
  const { fullname, email, password, contact, isSeller } = req.body;

  const userExists = await userModel.findOne({ $or: [{ email }, { contact }] });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists with this email or contact");
  }

  const user = await userModel.create({
    fullname,
    email,
    password,
    contact,
    role: isSeller ? "seller" : "buyer",
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    message:
      "Registration successful. Please check your email to verify your account.",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  const user = await userModel.findOne(
    isEmail(identifier) ? { email: identifier } : { username: identifier },
  );

  if (!user) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  await sendTokenResponse(user, res, "user logged in sucessfully");

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Login sucessfull",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "user details fetched successfully",
    success: true,
    user: req.user,
  });
});

export const googleCallback = asyncHandler(async (req, res) => {
  const { id, displayName, emails, photos } = req.user;
  const email = emails[0].value;
  const profilePic = photos[0].value;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    user = await userModel.create({
      fullname,
      email,
      goodleId,
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: " 7d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  
  res.redirect("http://localhost:5173/dashboard");
});
