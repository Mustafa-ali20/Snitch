import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import errorHandler from "../middlewares/error.middleware.js";
import authRouter from "../routes/auth.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Snitch API" });
});

app.use("/api/auth", authRouter);

app.use(errorHandler);

export default app;
