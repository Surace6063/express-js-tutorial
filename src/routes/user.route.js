import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  updateUserByPatch,
} from "../controllers/user.controller.js";
import {
  validationHandler,
} from "../middlewares/express.validation.middleware.js";
import { createUserValidation } from "../validators/user.validator.js";
import upload from "../middlewares/cloudinary-multer.js";

const router = express.Router();

// route GET -> http://localhost:4000/user/list
router.get("/list", getUsers);

// GET -> http://localhost:4000/user/id (id -> sent by user)
router.get("/:id", getUser);

// POST -> http://localhost:4000/user/create
router.post(
  "/create",
  upload.single("profile"),  // middleware for image
  createUserValidation,   // user validation schema middleware
  validationHandler,    // express validator middleware
  createUser,
);

// DELETE -> http://localhost:4000/user/delete/id
router.delete("/delete/:id", deleteUser);

// PUT -> http://localhost:4000/user/update/id
router.put("/update/:id", updateUser);

// PATCH -> http://localhost:4000/user/update/id
router.patch("/update/:id", updateUserByPatch);

export default router;
