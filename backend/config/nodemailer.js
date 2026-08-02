
import "dotenv/config";
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error) => {
  if (error) console.error("SMTP connection error:", error.message);
  else console.log("SMTP server ready to send emails");
});

export default transporter;