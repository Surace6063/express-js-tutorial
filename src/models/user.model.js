import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    profilePic: {
      type: String, // URL to profile picture
      required: false
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      unique: [true, "Email must be unique"],
      lower: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be atleast 8 charcter."],
      select: false, // do not return password by default
    },
    dob : {
      type: Date,
      required: false
    },
    age: {
      type: Number,
      min: 0
    },
    isActive: {
      type: Boolean,
      default: false
    },
    hobbies: {
      type: [String],
      default: []
    },
    roles: {
      type: String,
      enum: ["user","admin","manager","moderator","guest"],
      default: "user"
    }
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;

