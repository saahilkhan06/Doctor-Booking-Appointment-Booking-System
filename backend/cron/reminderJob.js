import cron from "node-cron";
import appointmentModel from "../models/appointmentModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import { appointmentReminderTemplate } from "../utils/emailTemplates.js";

// Runs every day at 9 AM
cron.schedule("0 9 * * *", async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0]; // adjust to match your slotDate format

  const appointments = await appointmentModel.find({
    slotDate: tomorrowStr,
    cancelled: false,
    isCompleted: false,
  });

  for (const appt of appointments) {
    await sendEmail({
      to: appt.userData.email,
      subject: "Reminder: Appointment Tomorrow - Prescripto",
      html: appointmentReminderTemplate({
        patientName: appt.userData.name,
        doctorName: appt.docData.name,
        date: appt.slotDate,
        time: appt.slotTime,
      }),
    });
  }
});