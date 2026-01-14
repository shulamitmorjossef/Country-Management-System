import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Avatar,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { authState } from "../state/auth.atom";
import "../styles/Registration.scss";
import { useUpdateUserByAdmin, useUserById } from "../api/userQueries";
import { SEVERITY, MESSAGES } from "../utils/constant";

type EditUserForm = {
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  permissions: {
    canAdd: boolean;
    canEdit: boolean;
    canDelete: boolean;
  };
};

const schema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function EditUserByAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);

  const [toast, setToast] = useState<{
    severity: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const { data, isLoading } = useUserById(id!, auth.token!);

  const updateMutation = useUpdateUserByAdmin(
    id!,
    auth.token!,
    (toastData) => {
      if (!toastData) return;
      setToast(toastData); 
      if (toastData.severity === SEVERITY.SUCCESS) {
        setTimeout(() => navigate("/users"), 500);
      }
    }
  );

  const initialData: EditUserForm | null = useMemo(() => {
    if (!data) return null;
    return {
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      email: data.email ?? "",
      isAdmin: data.isAdmin ?? false,
      permissions: {
        canAdd: data.permissions?.canAdd ?? false,
        canEdit: data.permissions?.canEdit ?? false,
        canDelete: data.permissions?.canDelete ?? false,
      },
    };
  }, [data]);

  if (isLoading || !initialData)
    return <CircularProgress style={{ display: "block", margin: "2rem auto" }} />;

  return (
    <div className="registration-page">
      <div className="registration-page__box">
        <h1>Edit User</h1>

        <Formik
          initialValues={initialData}
          validationSchema={schema}
          onSubmit={(values) => updateMutation.mutate(values)}
        >
          {({ values, handleChange, handleSubmit, touched, errors, dirty, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Avatar
                src={
                  data?.profilePicture
                    ? `${import.meta.env.VITE_API_URL}${data.profilePicture}`
                    : undefined
                }
                sx={{ width: 80, height: 80, alignSelf: "center", marginBottom: 2 }}
              />

              <TextField
                label="First name"
                name="firstName"
                fullWidth
                margin="normal"
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                required
              />

              <TextField
                label="Last name"
                name="lastName"
                fullWidth
                margin="normal"
                value={values.lastName}
                onChange={handleChange}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                required
              />

              <TextField
                label="Email"
                name="email"
                fullWidth
                margin="normal"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                required
              />

              <h3>Permissions</h3>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.permissions.canAdd}
                    onChange={(e) => setFieldValue("permissions.canAdd", e.target.checked)}
                  />
                }
                label="Can add"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.permissions.canEdit}
                    onChange={(e) => setFieldValue("permissions.canEdit", e.target.checked)}
                  />
                }
                label="Can edit"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.permissions.canDelete}
                    onChange={(e) => setFieldValue("permissions.canDelete", e.target.checked)}
                  />
                }
                label="Can delete"
              />

              <div className="form-buttons">
                <button
                  type="button"
                  className="app-button"
                  onClick={() => {
                    setToast({ severity: SEVERITY.INFO, message: MESSAGES.USER_NOT_UPDATED });
                    setTimeout(() => navigate("/users"), 500);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="app-button"
                  disabled={!dirty || updateMutation.isPending}
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>

      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={toast?.severity} onClose={() => setToast(null)} sx={{ width: "100%" }}>
          {toast?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
