import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import Notification from "../models/Notification.js";
// Fonction pour créer un rendez-vous
export const createAppointment = async (req, res) => {
  try {
    const { date, hour, description } = req.body;

    // Vérifier si l'utilisateur est authentifié
    if (!req.user) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }
   
    const existingAppointment = await Appointment.findOne({
      date,
      hour,
    });
    if (existingAppointment) {
      return res.status(400).json({ message: "Rendez-vous déjà existant" });
    }
    // Créer un nouveau rendez-vous
    const newAppointment = new Appointment({
      patient: req.user._id, // L'utilisateur connecté devient le "patient"
      date,
      hour,
      description,
      status: false, // Par défaut, le statut est "false" (non confirmé)
    });
    const notification= new Notification({
      message:`youre appointment on ${date} at ${hour}`,
      recipientEmail:req.user.email,
      appointment:newAppointment._id
    });
await notification.save();
    // Enregistrer dans la base de données
    const savedAppointment = await newAppointment.save();
// isObjectIdOrHexString.emit("appointmentBooked",{message:`youre appointment on ${date} at ${hour}`,
//   patientId,
//   date,
//   hour,

  // })
    // Répondre avec les informations du rendez-vous créé
    res.status(201).json({
      message: "Rendez-vous créé avec succès",
      appointment: savedAppointment,
    });
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous :", error.message);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};
export const getAllAppointments = async (req, res) => {
  
  try{
    const appointments = await Appointment.find()
    .populate("patient","firstName lastName email phone")
    .exec();
    res.status(200).json({message:"appointments retrieved successfully",appointments});
  
  }catch(error){
    res.status(500).json({message:"Error retrieving appointments",error});
    console.error("Error retrieving appointments", error);
  }
};
export const getPatientAppointments = async (req, res) => {
  // try {
  //   console.log("Patient ID:", req.user._id);  // Log the patient ID to check if it's correct
  //   const appointments = await Appointment.find({ patient: req.user._id });
  //   if (appointments.length === 0) {
  //     return res.status(404).json({ message: "No appointments found" });
  //   }
  //   res.status(200).json({ message: "Appointments retrieved successfully", appointments });
  // } catch (error) {
  //   console.error("Error retrieving appointments", error);
  //   res.status(500).json({ message: "Error retrieving appointments", error });
  // }
  try {
    console.log("patient id from request:",req.user._id);
    const appointments = await Appointment.find({ patient: req.user._id }).populate("patient", "name email");
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { date, hour,description, status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { date, hour,description, status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    //update the appointmenyts fields
    appointment.date=date ||appointment.date;
    appointment.hour=hour ||appointment.hour;
    appointment.description=description ||appointment.description;
    appointment.status=status ||appointment.status;
    const updatedAppointment=await appointment.save();
    res.status(200).json({
      message:"appointment updated successfully",
      updateAppointment,
    });
    
  }catch(error){
    console.error("error updating appointment:",error.message);
    rs.status(500).json({message:"server error"});
  }
}
export const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });  
  } catch (error) { 
    console.error("Error deleting appointment:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}
export const changeStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;
    
    // Validate input
    if (typeof status !== 'boolean') {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true, runValidators: true }
    ).populate('patient', 'firstName lastName email phone');

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Return updated appointment with patient details
    res.status(200).json({
      message: "Appointment status updated successfully",
      appointment
    });
    
  } catch (error) {
    console.error("Error changing appointment status:", error.message);
    
    // Handle specific Mongoose errors
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid appointment ID format" });
    }
    
    res.status(500).json({ 
      message: "Server error",
      error: error.message 
    });
  }
};