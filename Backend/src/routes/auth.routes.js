import { Router } from "express";
import passport from "passport";
import {
  getMe,
  googleCallback,
  login,
  register,
  logout,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validator/auth.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { config } from "dotenv";

const authRouter = Router();

authRouter.post("/register", registerValidator, register);
authRouter.post("/login", loginValidator, login);
authRouter.get("/get-me", authMiddleware, getMe);
authRouter.post("/logout", authMiddleware, logout);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect:
      config.NODE_ENV == "development" ? "http://localhost:5173/" : "/",
  }),
  googleCallback,
);

export default authRouter;
