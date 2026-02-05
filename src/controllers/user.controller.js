import User from "../models/user.model.js";
import { ErrorMessage } from "../utils/ErrorMessage.js";
import mongoose from "mongoose";
import cloudinary from "../utils/cloudinary.js";
import path from "path"
import DatauriParser from "datauri/parser.js"; 

const parser = new DatauriParser()

// get all users
export const getUsers = async (req, res, next) => {
  try {
    // fetching all users from db
    const users = await User.find();

    if (!users || users.length === 0) {
      return next(ErrorMessage("Users not found", 404));
    }

    // sending response to client
    res.status(200).json(users);
  } catch (error) {
    // handle server error
    next(error);
  }
};

// get single user
export const getUser = async (req, res, next) => {
  try {
    const user_id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(user_id))
      return next(ErrorMessage("Invalid Id format.", 400));

    // logic to search above user_id in databse
    const user = await User.findById(user_id);

    if (!user) return next(ErrorMessage("User not found", 404));

    res.status(200).json({
      message: "User found sucessfully.",
      user,
    });
  } catch (error) {
    // handle server error
    next(error);
  }
};

// create new user
export const createUser = async (req, res, next) => {
  try {
    // const { username, email, password } = req.body;

    // if (!username || !email || !password) {
    //   next(ErrorMessage("All fileds are required!", 400));
    // }

    // find if email already exist in user model or not
    // const existingEmail = await User.findOne({ email: req.body.email });
    // if (existingEmail) return next(ErrorMessage("Email already in use.", 400))

     // get file extension (.png, .jpg, etc) 
    const extName = path.extname(req.file.originalname); 
 
    // convert buffer to data URI 
    const fileUri = parser.format(extName, req.file.buffer); 
 
    const result = await cloudinary.uploader.upload(fileUri.content, { 
      resource_type: "auto", 
      folder: "uploads/users/", // optional 
    })

    // storing user data in database
    const newUser = await User.create({
      ...req.body,
      profilePic: result.secure_url
    })

    res.status(201).json({
      message: "New user created successfully.",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

// delete user
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return next(ErrorMessage("Invalid Id format.", 400));

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return next(ErrorMessage("User not found", 404));

    res.status(200).json({
      message: `User deleted sucessfully.`,
    });
  } catch (error) {
    next(error);
  }
};

// update user using put
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { username, email, password } = req.body;

    // logic to update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true },
    );

    res.status(200).json({
      message: `User updated sucessfully`,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// update user using put
export const updateUserByPatch = async (req, res) => {
  try {
    const { id } = req.params;

    // logic to update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body, // only fields sent will be changed
      { new: true },
    );

    res.status(200).json({
      message: `User updated sucessfully`,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};



