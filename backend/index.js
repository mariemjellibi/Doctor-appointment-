import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
dotenv.config();
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow cookies to be sent with requests

};
const app = express();

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use(cookieParser()); //to parse cookies in the req object

// Set the port
const PORT = process.env.PORT || 5005;

// Connect to the database
connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1); // Exit the process if DB connection fails
  });
//routes
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
