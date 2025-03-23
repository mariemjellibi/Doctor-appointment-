import express from "express";
import sendEmail from "../utils/sendEmail.js";
import sendAppointmentReminder from "../utils/sendReminders.js";
const router = express.Router();

// router.get("/send-test-email", async (req, res) => {
//     try {
//         console.log("email is  sending ")
//         await sendEmail(
//             "mariemjellibi4@gmail.com", // Replace with your test email
//             "Test Email",
//             "This is a test email from your server."
//         );
//         console.log("email sent")
//         res.status(200).json({ message: "✅ Test email sent successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "❌ Error sending test email", error });
//     }
// });
router.get("/send-test-email", async (req, res) => {
    try{
         await sendAppointmentReminder();
         res.status(200).json({ message: "✅ Test email sent successfully" });
    }catch(error){
        res.status(500).json({ message: "❌ Error sending test email", error });
    }
   
    
})

export default router;
