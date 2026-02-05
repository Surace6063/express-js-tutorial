import { validationResult } from "express-validator";
import {ErrorMessage} from "../utils/ErrorMessage.js"

// middlware 
export const validationHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = ErrorMessage("Validation failed", 400)

    // attach validation details
    error.errors = errors.array().map(err => ({
         field: err.path,
         message: err.msg
    }))

    return next(error);
  }

  next();
}