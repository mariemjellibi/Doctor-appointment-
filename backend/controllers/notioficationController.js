import express from "express";
import Notification from "../models/Notification.js";
export const getAllNotificatios = async (req, res) => {
  try {
    console.log("Fetching notifications for email:", req.params.email);
    const notifications = await Notification.find({
      recipientEmail: req.params.email,
      isRead: false,
    });
   // console.log("notifications:", notifications);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const read = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ message: "notification uppdated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const removeNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: "notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteAllNotification = async (req, res) => {
  try {
    await Notification.deleteMany({ recipientEmail: req.params.email });
    return res.json({ message: "notification all deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
