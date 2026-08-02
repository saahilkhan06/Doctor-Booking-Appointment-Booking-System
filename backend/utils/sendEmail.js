import transporter from "../config/nodemailer.js";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!to) throw new Error("No recipient email provided");

    const info = await transporter.sendMail({
      from: `"Prescripto" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("Email send failed:", error.message);
    return { success: false, error: error.message };
  }
};