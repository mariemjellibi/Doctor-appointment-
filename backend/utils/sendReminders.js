import Appointment from "../models/Appointment.js";
import Notification from "../models/Notification.js";
import sendEmail from "./sendEmail.js";


const sendAppointmentReminder = async () => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const endOfDay = new Date(tomorrow);
    endOfDay.setHours(23, 59, 59, 999);

    // Get all appointments for tomorrow and populate patient
    const appointments = await Appointment.find({
      date: { $gte: tomorrow, $lte: endOfDay },
    }).populate("patient");

    if (appointments.length === 0) {
      console.log("No appointments for tomorrow");
      return;
    }

    // Group by patient email and keep only the earliest appointment
    const reminderMap = new Map(); // key: email, value: appointment

    for (const appt of appointments) {
      const email = appt.patient.email;
      if (
        !reminderMap.has(email) ||
        reminderMap.get(email).date > appt.date
      ) {
        reminderMap.set(email, appt);
      }
    }

    // Send reminder for each patient
    for (const [email, appointment] of reminderMap.entries()) {
      const patient = appointment.patient;
      const emailContent = `
        <h2>Rappel du rendez-vous</h2>
        <p>Bonjour ${patient.firstName} ${patient.lastName},</p>
        <p>Nous vous rappelons que vous avez un rendez-vous demain à ${appointment.hour}.</p>
        <p>Merci de ne pas oublier votre consultation.</p>
        <br>
        <p>Cordialement,</p>
        <p>Votre docteur</p>
      `;

      await sendEmail(email, "Rappel de rendez-vous", emailContent);

      await Notification.create({
        message: `Rappel: Vous avez un rendez-vous demain à ${appointment.hour}`,
        recipientEmail: email,
        appointment: appointment._id,
      });

      console.log(`Reminder sent to ${email}`);
    }
  } catch (error) {
    console.error("Error sending appointment reminders:", error);
  }
};
export default sendAppointmentReminder;