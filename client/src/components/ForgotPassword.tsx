import { useState } from "react";
import { TextField, Typography } from "@mui/material";
import { forgotPassword } from "../api/users";
import "../styles/Login.scss";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      alert("Error sending email");
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-page__box">
        <Typography variant="h5" component="h1">
          Forgot Password
        </Typography>

        {!sent ? (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="app-button">
              Send Reset Email
            </button>
          </form>
        ) : (
          <Typography sx={{ marginTop: "1.5rem", color: "var(--primary-color)" }}>
            if the email exists in our system, a reset link has been sent!
          </Typography>
        )}
      </div>
    </div>
  );
}
