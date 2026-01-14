import { useState } from "react";
import { TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useForgotPasswordToast } from "../api/userQueries";
import "../styles/Login.scss";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState<{ severity: "success" | "error"; message: string } | null>(null);

  const forgotMutation = useForgotPasswordToast(setToast, setSent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotMutation.mutate(email);
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

      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToast(null)}
          severity={toast?.severity ?? "success"}
          sx={{ width: "100%" }}
        >
          {toast?.message ?? ""}
        </Alert>
      </Snackbar>
    </div>
  );
}
