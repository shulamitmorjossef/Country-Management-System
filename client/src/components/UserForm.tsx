import { Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import "../styles/Registration.scss";
import type { IUser } from "../types";

type Props = {
  initialValues: Partial<IUser>;
  onSubmit: (values: Partial<IUser>) => void;
};

// TODO : Move validation schema to constants file if reused elsewhere
export default function UserForm({ initialValues, onSubmit }: Props) {
  const schema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string(),
    password: Yup.string().min(6, "Password too short").required("Required"),
  });

  return (
    <div className="registration-form-container">
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
        {({ values, handleChange, handleSubmit, errors, touched, dirty }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              margin="normal"
              value={values.firstName}
              onChange={handleChange}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName ? errors.firstName : ""}
            />
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              margin="normal"
              value={values.lastName}
              onChange={handleChange}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName ? errors.lastName : ""}
            />
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
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email ? errors.email : ""}
            />
            <TextField
              label="Phone"
              name="phone"
              fullWidth
              margin="normal"
              value={values.phone}
              onChange={handleChange}
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
              Register
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
