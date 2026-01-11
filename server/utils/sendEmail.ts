import nodemailer from "nodemailer";

export async function sendEmail(
  to: string,
  newPassword: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Password reset",
    text: `Your new password is: ${newPassword}`,
  });
}
