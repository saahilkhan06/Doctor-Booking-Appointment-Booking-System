import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for 587 (STARTTLS)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Render's free tier has no outbound IPv6 support - Gmail's SMTP
  // sometimes resolves to an IPv6 address, causing ENETUNREACH.
  // Forcing IPv4 here avoids that entirely.
  family: 4,
});

transporter.verify((error) => {
  if (error) console.error("SMTP connection error:", error.message);
  else console.log("SMTP server ready to send emails");
});

export default transporter;