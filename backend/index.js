import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cors from "cors";
import test from "./routes/test.js";
import cron from "node-cron";
import sendAppointmentReminder from "./utils/sendReminders.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js"
import session from "express-session";
import passport from "./utils/passport.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
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
app.use("/api/notifications",notificationRoutes);
app.use("/api/test",test);
cron.schedule("0 8 * * *", async () => {
  console.log("Running cron job");
  await sendAppointmentReminder();
});
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth",authRoutes)
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
