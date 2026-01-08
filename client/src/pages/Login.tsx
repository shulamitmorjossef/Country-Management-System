import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useMutation } from "@tanstack/react-query";
import LoginForm from "../components/LoginForm";
import { login } from "../api/users";
import { authState } from "../state/auth.atom";
import { SEVERITY, MESSAGES } from "../utils/constant";
import "../styles/Registration.scss";

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
  const [toast, setToast] = useState<{ severity: "success" | "error"; message: string } | null>(null);

  const mutation = useMutation({
    mutationFn: (data: { username: string; password: string }) => login(data.username, data.password),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setAuth({ user: data.user, token: data.token });
      setToast({ severity: SEVERITY.SUCCESS, message: MESSAGES.LOGIN_SUCCESS });
    },
    onError: () => {
      setToast({ severity: SEVERITY.ERROR, message: MESSAGES.WRONG_CREDENTIALS });
    },
  });

  return (
    <div className="registration-page">
      <div className="registration-page__box">
        <h1>Login</h1>
        <LoginForm initialValues={{ username: "", password: "" }} onSubmit={(values) => mutation.mutate(values)} />
      </div>
   

      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToast(null)}
          severity={toast?.severity ?? "success"}
          sx={{ width: "100%" }}
          onClick={() => {
            if (toast?.severity === SEVERITY.SUCCESS) navigate("/countries");
          }}
        >
          {toast?.message ?? ""}
        </Alert>
      </Snackbar>


    </div>

  );
}
