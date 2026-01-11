import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextField, Typography } from "@mui/material";
import { resetPassword } from "../api/users";
import "../styles/Login.scss";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      await resetPassword(token, password);
      alert("Password updated!");
      navigate("/login");
    } catch (err) {
      alert("Link expired or invalid");
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-page__box">
        <Typography variant="h5" component="h1">
          Set New Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="app-button">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
