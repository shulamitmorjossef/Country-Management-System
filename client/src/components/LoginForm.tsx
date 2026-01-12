import { Formik } from "formik";
import * as Yup from "yup";
import { Box, TextField } from "@mui/material";
import "../styles/Registration.scss";
import { useNavigate } from "react-router-dom";

type Props = {
  initialValues: { username: string; password: string };
  onSubmit: (values: { username: string; password: string }) => void;
};

export default function LoginForm({ initialValues, onSubmit }: Props) {
  const navigate = useNavigate();
  const schema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <div className="registration-form-container">
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
        {({ values, handleChange, handleSubmit, errors, touched, dirty }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              margin="normal"
              value={values.username}
              onChange={handleChange}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username ? errors.username : ""}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password ? errors.password : ""}
            />
            <button type="submit" className="app-button" disabled={!dirty}>
              Login
            </button>
            <div className="form-footer">
              <p className="footer-link" onClick={() => navigate("/forgot-password")}>
                Forgot password?
              </p>
              <p className="footer-link" onClick={() => navigate("/registration")}>
                Register
              </p>
            </div>
            
          </form>
        )}
      </Formik>
    </div>
  );
}