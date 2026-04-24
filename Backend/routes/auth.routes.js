import { Router } from "express";
import { getMe, login, register } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, register);
authRouter.post("/login", loginValidator, login)
authRouter.get("/get-me", authMiddleware, getMe);

export default authRouter;
