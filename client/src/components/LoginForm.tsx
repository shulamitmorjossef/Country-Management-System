import { Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import type { IUser } from "../types";
import "../styles/Registration.scss";

type Props = {
  initialValues: { username: string; password: string };
  onSubmit: (values: { username: string; password: string }) => void;
};

export default function LoginForm({ initialValues, onSubmit }: Props) {
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
            <p>forget password?</p>
          </form>
        )}
      </Formik>
    </div>
  );
}
