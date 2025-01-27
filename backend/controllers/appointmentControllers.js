import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import mongoose from "mongoose";
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

    // Enregistrer dans la base de données
    const savedAppointment = await newAppointment.save();

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
    const appointments = await Appointment.find();
    res.status(200).json({message:"appointments retrieved successfully",appointments});
  
  }catch(error){
    res.status(500).json({message:"Error retrieving appointments",error});
    console.error("Error retrieving appointments", error);
  }
};
export const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req._id });
    res.status(200).json({ message: "Appointments retrieved successfully", appointments });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving appointments", error });
    console.error("Error retrieving appointments", error);  
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