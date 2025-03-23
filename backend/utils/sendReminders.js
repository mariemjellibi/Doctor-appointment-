import Appointment from "../models/Appointment.js";
import Notification from "../models/Notification.js";
import sendEmail from "./sendEmail.js";
const sendAppointmentReminder = async()=>{
    try{
        //get tommorrow date
        const tomorrow=new Date();
        tomorrow.setDate(tomorrow.getDate()+1);
        tomorrow.setHours(0,0,0,0);
        const endofday=new Date(tomorrow);
        endofday.setHours(23,59,59,999);

        //get all appointments for tomorrow
        const appointments=await Appointment.find({date:{$gte:tomorrow,$lte:endofday}}).populate("patient");
        if(appointments.length===0){
            console.log("No appointments for tomorrow");
            return;
        }
        for(const appointment of appointments){
            //send reminder
            // console.log(appointment.patient.email);
            const patient= appointment.patient;
            const emailcontent=`<h2>Rappel du render vous<h2>
            <p>Bonjour ${patient.firstName} ${patient.lastName},</p>
            <p>Nous vous rappelons que vous avez un rendez-vous demain à ${appointment.hour}.</p>
                <p>Merci de ne pas oublier votre consultation.</p>
                <br>
                <p>Cordialement,</p>
                <p>Votre docteur</p>
            
            `;
       
        //time to send the email
        await sendEmail(patient.email,"rapperl de rendez vous",emailcontent);
        await Notification.create({
            message: `Rappel: Vous avez un rendez-vous demain à ${appointment.hour}`,
                recipientEmail: patient.email,
                appointment: appointment._id
        });
        console.log("Appointment reminders sent");
    }
    }catch(error){
        console.error("Error sending appointment reminders:",error);
    }
}
export default sendAppointmentReminder;