import nodemailer from "nodemailer";

export async function sendResetEmail(to: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const clientUrl = process.env.CLIENT_URL;
  const resetUrl = `${clientUrl}/reset-password/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Password Reset Request",
    html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  });
}