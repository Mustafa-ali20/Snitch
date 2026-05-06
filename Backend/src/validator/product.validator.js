import { body } from "express-validator";
import { validate } from "./validate.middleware.js";

export const createProductValidator = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isString().withMessage("Title must be a string")
    .isLength({ min: 3, max: 100 }).withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required")
    .isString().withMessage("Description must be a string")
    .isLength({ min: 10, max: 1000 }).withMessage("Description must be between 10 and 1000 characters"),

  body("price.amount")
    .notEmpty().withMessage("Price amount is required")
    .isFloat({ min: 0 }).withMessage("Price must be a positive number"),

  body("price.currency")
    .optional()
    .isIn(["USD", "EUR", "INR", "KWD"]).withMessage("Currency must be USD, EUR, INR or KWD"),

  body("images")
    .notEmpty().withMessage("At least one image is required")
    .isArray({ min: 1 }).withMessage("Images must be an array with at least one image"),

  body("images.*.url")
    .notEmpty().withMessage("Image URL is required")
    .isURL().withMessage("Each image must have a valid URL"),

  validate,
];