import express from "express";
const router = express.Router();
import passport from "../utils/passport.js";
import User from "../models/User.js";
// Google Authentication Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Authentication Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/success",
    failureRedirect: "/auth/failure",
  })
);

// Success route
router.get("/success", (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });

  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    phone: req.user.phone,
    isDoctor: req.user.isDoctor,
  });
});

// Failure route
router.get("/failure", (req, res) => {
  res.status(401).json({ message: "Authentication failed" });
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: "Déconnexion réussie" });
  });
});
export default router;