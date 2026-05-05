import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import errorHandler from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import { config } from "./config/config.js";
import productRoute from "./routes/product.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (_, __, profile, done) => {
      return done(null, profile);
    },
  ),
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Snitch API" });
});

app.use("/api/auth", authRouter);
app.use("/api/product", productRoute);

app.use(errorHandler);

export default app;
