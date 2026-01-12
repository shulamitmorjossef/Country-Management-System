import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextField, Snackbar, Alert } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { resetPassword } from "../api/users";
import { SEVERITY, MESSAGES } from "../utils/constant"; 
import "../styles/Registration.scss";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState<{ severity: "success" | "error"; message: string } | null>(null);

  const schema = Yup.object({
    password: Yup.string().min(6, "Password too short").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match') 
      .required("Required"),
  });

  const handleSubmit = async (values: { password: string }) => {
    if (!token) return;

    try {
      await resetPassword(token, values.password);
      setToast({ severity: SEVERITY.SUCCESS, message: MESSAGES.PASSWORD_UPDATED_SUCCESS });
    } catch (err) {
      setToast({ severity: SEVERITY.ERROR, message: MESSAGES.LINK_EXPIRED_OR_INVALID });
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-page__box">
        <h1>Set New Password</h1>

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleSubmit, errors, touched, dirty }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="New Password"
                name="password"
                type="password"
                margin="normal"
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password ? errors.password : ""}
              />

              <TextField
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                margin="normal"
                value={values.confirmPassword}
                onChange={handleChange}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""}
              />

              <button type="submit" className="app-button" disabled={!dirty}>
                Update Password
              </button>
            </form>
          )}
        </Formik>
      </div>

      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => {
          if (toast?.severity === SEVERITY.SUCCESS) navigate("/login");
          setToast(null);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
        onClose={() => {
          if (toast?.severity === SEVERITY.SUCCESS) navigate("/login");
          setToast(null);
        }}
        >
          {toast?.message ?? ""}
        </Alert>
      </Snackbar>
    </div>
  );
}