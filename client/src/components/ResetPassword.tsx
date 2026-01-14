import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextField, Snackbar, Alert } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useResetPasswordToast } from "../api/userQueries";
import { SEVERITY } from "../utils/constant"; 
import "../styles/Registration.scss";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState<{ severity: "success" | "error"; message: string } | null>(null);
  const resetPasswordMutation = useResetPasswordToast(setToast);


  const schema = Yup.object({
    password: Yup.string().min(6, "Password too short").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match') 
      .required("Required"),
  });

  const handleSubmit = (values: { password: string }) => {
  if (!token) return;

  resetPasswordMutation.mutate({
    token,
    password: values.password,
  });
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