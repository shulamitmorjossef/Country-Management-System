import { useState, useMemo } from "react";
import {
  TextField,
  Button,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { Formik } from "formik";
import * as Yup from "yup";
import { authState } from "../state/auth.atom";
import { MESSAGES, SEVERITY } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import "../styles/Registration.scss";
import { useUpdateProfileToast } from "../api/userQueries";

type EditProfileForm = {
  firstName: string;
  lastName: string;
  phone: string;
  profilePicture: string | File;
};

const schema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  phone: Yup.string(),
});

export default function EditProfile() {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  const [toast, setToast] = useState<{
    severity: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const initialData: EditProfileForm = useMemo(
    () => ({
      firstName: auth.user?.firstName ?? "",
      lastName: auth.user?.lastName ?? "",
      phone: auth.user?.phone ?? "",
      profilePicture: auth.user?.profilePicture ?? "",
    }),
    [auth.user]
  );

  const updateMutation = useUpdateProfileToast(
    auth.user!._id!,
    auth.token!,
    setAuth,
    setToast
  );

  const handleSave = (values: EditProfileForm) => {
    const payload = new FormData();
    payload.append("firstName", values.firstName);
    payload.append("lastName", values.lastName);
    payload.append("phone", values.phone);
    if (values.profilePicture instanceof File) {
      payload.append("profilePicture", values.profilePicture);
    }

    updateMutation.mutate(payload, {
      onSuccess: () => {
        setTimeout(() => navigate("/countries"), 600);
      },
    });
  };

  const handleCancel = () => {
    setToast({
      severity: SEVERITY.INFO,
      message: MESSAGES.CHANGES_DISCARDED,
    });
    setTimeout(() => navigate("/countries"), 600);
  };

  return (
    <div className="registration-page">
      <div className="registration-page__box">
        <h1>Edit Profile</h1>

        <Formik initialValues={initialData} validationSchema={schema} onSubmit={handleSave}>
          {({ values, handleChange, handleSubmit, errors, touched, dirty, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Avatar
                src={
                  typeof values.profilePicture === "string"
                    ? `${import.meta.env.VITE_API_URL}${values.profilePicture}`
                    : values.profilePicture
                    ? URL.createObjectURL(values.profilePicture)
                    : undefined
                }
                sx={{ width: 80, height: 80, alignSelf: "center", marginBottom: 2 }}
              />

              <Button component="label" variant="outlined" fullWidth sx={{ marginBottom: 2, borderColor: '#800020', color: '#800020', '&:hover': { borderColor: '#600018', backgroundColor: 'rgba(128, 0, 32, 0.04)' } }}>
                Upload picture
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFieldValue("profilePicture", file);
                    }
                  }}
                />
              </Button>

              <TextField
                label="First name"
                name="firstName"
                fullWidth
                margin="normal"
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName ? errors.firstName : ""}
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
                helperText={touched.lastName && errors.lastName ? errors.lastName : ""}
                required
              />

              <TextField
                label="Phone"
                name="phone"
                fullWidth
                margin="normal"
                value={values.phone}
                onChange={handleChange}
              />

              <div className="form-buttons">
                <button type="button" className="app-button" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="app-button" disabled={!dirty || updateMutation.isPending}>
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
        <Alert severity={toast?.severity}>{toast?.message}</Alert>
      </Snackbar>
    </div>
  );
}
