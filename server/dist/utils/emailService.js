"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetEmail = sendResetEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
async function sendResetEmail(to, token) {
    const transporter = nodemailer_1.default.createTransport({
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
