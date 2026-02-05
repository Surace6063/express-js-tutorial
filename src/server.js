import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import connectDB from "./config/db.js";
import { globalErrorHandler } from "./middlewares/globalError.middleware.js";

// Load environment variables from .env file
dotenv.config();

// database connection
connectDB();

const app = express();

const port = process.env.PORT || 4500;

// in-build middleware to parse json data
app.use(express.json());

// in-build middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

// route GET -> http://localhost:4000
app.get("/", (req, res) => {
  res.status(200).send("First api response.");
});

// user routes
app.use("/user", userRoute);



// global error handling
app.use(globalErrorHandler)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}.`);
});
