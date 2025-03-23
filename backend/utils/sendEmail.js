import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "mariemjellibi22@gmail.com",
                pass: "bety jpbt bjkc mzcf"
            }
        });

        const mailOptions = {
            from: "mariemjellibi22@gmail.com",
            to,
            subject,
            text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.response);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};

export default sendEmail;
