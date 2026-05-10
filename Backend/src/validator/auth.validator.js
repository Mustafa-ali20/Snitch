import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json({
    success: false,
    errors: errors.array(),
  });
};

export const registerValidator = [
  body("fullname")
    .trim()
    .notEmpty()
    .withMessage("Fullname is required")
    .isString()
    .withMessage("Fullname must be a string")
    .isLength({ min: 3, max: 20 })
    .withMessage("Fullname must be between 3 and 20 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .custom((value) => {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
      if (!passwordRegex.test(value)) {
        throw new Error(
          "Password must contain at least one uppercase letter and one number",
        );
      }
      return true;
    }),

  body("contact")
    .notEmpty()
    .withMessage("Contact is required")
    .isNumeric()
    .matches(/^\d{8}$/)
    .withMessage("Contact must be 8-digit number"),

  validate,
];

export const loginValidator = [
  body("identifier")
    .trim()
    .notEmpty()
    .withMessage("Email or fullname is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  validate,
];
