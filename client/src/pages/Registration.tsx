import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/Registration.scss";
import UserForm from "../components/UserForm";
import { useCreateUserToast } from "../api/userQueries";
import { SEVERITY } from "../utils/constant";

export default function Registration() {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{ severity: "success" | "error"; message: string } | null>(null);

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    profilePicture: "",
  };

  const mutation = useCreateUserToast(setToast);

  return (
    <div className="registration-page">
      <div className="registration-page__box">
        <h1>Register</h1>
        <UserForm initialValues={initialValues} onSubmit={(values) => mutation.mutate(values)} />
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
          <Alert onClose={() => {
            if (toast?.severity === SEVERITY.SUCCESS) navigate("/countries");
            setToast(null);
          }} severity={toast?.severity ?? "success"} sx={{ width: "100%" }}>
            {toast?.message ?? ""}
          </Alert>
      </Snackbar>
    </div>
  );
}
