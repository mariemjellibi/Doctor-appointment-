import {
  createAppointment,
  getAllAppointments,
  getPatientAppointments,
  updateAppointment,
} from "../controllers/appointmentControllers.js";
import express from "express";
import protectRoute from "../middlewars/protectRoute.js";
import checkDoctor from "../middlewars/checkDoctor.js";
const router = express.Router();
router.post("/create", protectRoute, createAppointment);
router.get("/all", protectRoute, checkDoctor, getAllAppointments);
router.get("/patient/appointments", protectRoute, getPatientAppointments);
router.put("/:appointmentId", protectRoute, updateAppointment);
export default router;
