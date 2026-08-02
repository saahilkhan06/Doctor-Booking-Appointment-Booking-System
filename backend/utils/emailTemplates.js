export const appointmentBookedTemplate = ({ patientName, doctorName, speciality, date, time }) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
    <div style="background: #5f6fff; padding: 20px; text-align: center;">
      <h2 style="color: #fff; margin: 0;">Appointment Confirmed</h2>
    </div>
    <div style="padding: 24px;">
      <p>Hi ${patientName},</p>
      <p>Your appointment has been successfully booked. Here are the details:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 8px 0; color: #555;">Doctor</td><td style="padding: 8px 0; font-weight: bold;">${doctorName}</td></tr>
        <tr><td style="padding: 8px 0; color: #555;">Speciality</td><td style="padding: 8px 0; font-weight: bold;">${speciality}</td></tr>
        <tr><td style="padding: 8px 0; color: #555;">Date</td><td style="padding: 8px 0; font-weight: bold;">${date}</td></tr>
        <tr><td style="padding: 8px 0; color: #555;">Time</td><td style="padding: 8px 0; font-weight: bold;">${time}</td></tr>
      </table>
      <p>Please arrive 10 minutes early. If you need to reschedule or cancel, you can do so from your dashboard.</p>
      <p style="margin-top: 24px; color: #999; font-size: 13px;">— Team Prescripto</p>
    </div>
  </div>
`;

export const appointmentCancelledTemplate = ({ patientName, doctorName, date, time }) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
    <div style="background: #ff4d4f; padding: 20px; text-align: center;">
      <h2 style="color: #fff; margin: 0;">Appointment Cancelled</h2>
    </div>
    <div style="padding: 24px;">
      <p>Hi ${patientName},</p>
      <p>Your appointment with <strong>${doctorName}</strong> on <strong>${date}</strong> at <strong>${time}</strong> has been cancelled.</p>
      <p>If this wasn't intentional or you'd like to rebook, please visit your dashboard.</p>
      <p style="margin-top: 24px; color: #999; font-size: 13px;">— Team Prescripto</p>
    </div>
  </div>
`;

export const paymentSuccessTemplate = ({ patientName, amount, doctorName, date }) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
    <div style="background: #22c55e; padding: 20px; text-align: center;">
      <h2 style="color: #fff; margin: 0;">Payment Successful</h2>
    </div>
    <div style="padding: 24px;">
      <p>Hi ${patientName},</p>
      <p>We've received your payment of <strong>₹${amount}</strong> for your appointment with <strong>${doctorName}</strong> on <strong>${date}</strong>.</p>
      <p style="margin-top: 24px; color: #999; font-size: 13px;">— Team Prescripto</p>
    </div>
  </div>
`;

export const appointmentReminderTemplate = ({ patientName, doctorName, date, time }) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
    <div style="background: #f59e0b; padding: 20px; text-align: center;">
      <h2 style="color: #fff; margin: 0;">Appointment Reminder</h2>
    </div>
    <div style="padding: 24px;">
      <p>Hi ${patientName},</p>
      <p>This is a reminder that you have an appointment with <strong>${doctorName}</strong> tomorrow, <strong>${date}</strong> at <strong>${time}</strong>.</p>
      <p style="margin-top: 24px; color: #999; font-size: 13px;">— Team Prescripto</p>
    </div>
  </div>
`;