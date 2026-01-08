import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import LoginForm from "../components/LoginForm";
import { authState } from "../state/auth.atom";
import { SEVERITY } from "../utils/constant";
import "../styles/Registration.scss";
import { useLoginUserToast } from "../api/userQueries";

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
  const [toast, setToast] = useState<{ severity: "success" | "error"; message: string } | null>(null);

  const loginMutation = useLoginUserToast(setToast, setAuth);
  return (
    <div className="registration-page">
      <div className="registration-page__box">
        <h1>Login</h1>
        <LoginForm initialValues={{ username: "", password: "" }} onSubmit={(values) => loginMutation.mutate(values)} />
      </div>
   

      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => {
          if (toast?.severity === SEVERITY.SUCCESS) navigate("/countries");
            setToast(null)
          }
        }
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => {
            if (toast?.severity === SEVERITY.SUCCESS) navigate("/countries");
              setToast(null)
            }
          }
          severity={toast?.severity ?? "success"}
          sx={{ width: "100%" }}

        >
          {toast?.message ?? ""}
        </Alert>
      </Snackbar>


    </div>

  );
}
