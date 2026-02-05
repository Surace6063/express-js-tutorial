import { body } from "express-validator";
import User from "../models/user.model.js";

// user validation
export const createUserValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 25 })
    .withMessage("Username must be 3 to 25 characters.")
    .custom(async (value) => {
      const exisitingUsername = await User.findOne({ username: value });
      if (exisitingUsername) {
        throw new Error("Username already in use.");
      }

      return true;
    }),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value) => {
      const existingEmail = await User.findOne({ email: value });
      if (existingEmail) {
        throw new Error("Email already in use.");
      }

      return true;
    }),
];
