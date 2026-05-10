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

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return token;
}

export const register = asyncHandler(async (req, res) => {
  const { fullname, email, password, contact } = req.body;

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
    role: "buyer",
  });

  await sendTokenResponse(user, res, "Registration successful");

  res.status(201).json({
    message:
      "Registration successful. Please check your email to verify your account.",
    success: true,
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    },
  });
});

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

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

  res.status(200).json({
    success: true,
    message: "Login sucessfull",
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
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
  const { displayName, emails, photos } = req.user;
  const email = emails[0].value;
  const profilePic = photos[0].value;

  let user = await userModel.findOne({ email }); // let not const

  if (!user) {
    user = await userModel.create({
      fullname: displayName,
      email,
      googleId: req.user.id,
      profilePic,
    });
  }

  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.redirect("http://localhost:5173/");
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
