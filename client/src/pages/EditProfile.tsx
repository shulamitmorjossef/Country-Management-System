import { useState, useMemo } from "react";
import {
  TextField,
  Button,
  Avatar,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { authState } from "../state/auth.atom";
import { MESSAGES, SEVERITY } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import "../styles/Registration.scss";
import { useUpdateProfileToast } from "../api/userQueries";

export default function EditProfile() {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  const [toast, setToast] = useState<{
    severity: "success" | "error";
    message: string;
  } | null>(null);

  const initialData = useMemo(
    () => ({
      firstName: auth.user?.firstName ?? "",
      lastName: auth.user?.lastName ?? "",
      phone: auth.user?.phone ?? "",
      profilePicture: auth.user?.profilePicture ?? "",
    }),
    [auth.user]
  );

  const [formData, setFormData] = useState(initialData);

  const isDirty =
    JSON.stringify(formData) !== JSON.stringify(initialData);

  const updateMutation = useUpdateProfileToast(
    auth.user!._id!,
    auth.token!,
    setAuth,
    setToast
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDirty) return;

    updateMutation.mutate(formData, {
      onSuccess: () => {
        setTimeout(() => navigate("/countries"), 600);
      },
    });
  };

  const handleCancel = () => {
    setToast({
      severity: SEVERITY.ERROR,
      message: MESSAGES.CHANGES_DISCARDED,
    });

    setTimeout(() => navigate("/countries"), 600);
  };

  return (
    <div className="registration-page">
      <div className="registration-page__box">
        <h1>Edit Profile</h1>

        <Box
          component="form"
          onSubmit={handleSave}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Avatar
            src={formData.profilePicture}
            sx={{ width: 80, height: 80, alignSelf: "center" }}
          />

          <TextField
            label="Profile picture URL"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <TextField
            label="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: 1,
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={handleCancel}
              fullWidth
              sx={{
                backgroundColor: "var(--primary-color)",
                borderRadius: "var(--button-radius)",
                fontSize: "0.85rem",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "var(--primary-color-hover)",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={!isDirty || updateMutation.isPending}
              fullWidth
              sx={{
                backgroundColor: "var(--primary-color)",
                borderRadius: "var(--button-radius)",
                fontSize: "0.85rem",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "var(--primary-color-hover)",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#c4c4c4",
                  color: "#666",
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
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
