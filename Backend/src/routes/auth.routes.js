import { Router } from "express";
import passport from "passport";
import {
  getMe,
  googleCallback,
  login,
  register,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validator/auth.validator.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { config } from "dotenv";

const authRouter = Router();

authRouter.post("/register", registerValidator, register);
authRouter.post("/login", loginValidator, login);
authRouter.get("/get-me", authMiddleware, getMe);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: config.NODE_ENV == 'developement' ? "http://localhost:5173/dashboard" : "/" }),
  googleCallback,
);

export default authRouter;
