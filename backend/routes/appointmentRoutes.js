import {
  createAppointment,
  getAllAppointments,
  getPatientAppointments,
  updateAppointment,
  deleteAppointment,
  changeStatus
} from "../controllers/appointmentControllers.js";
import express from "express";
import protectRoute from "../middlewars/protectRoute.js";
import checkDoctor from "../middlewars/checkDoctor.js";
const router = express.Router();
router.post("/create", protectRoute, createAppointment);
router.get("/all", protectRoute, checkDoctor, getAllAppointments);
router.get("/patient/allappointments", protectRoute, getPatientAppointments);
router.put("/:appointmentId", protectRoute, updateAppointment);
router.delete("/:appointmentId", protectRoute, deleteAppointment);
router.patch("/:appointmentId/status", protectRoute, changeStatus); // For updating appointment status
export default router;
