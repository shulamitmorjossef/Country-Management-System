import { useMutation } from "@tanstack/react-query";
import { createUser, login } from "./users";
import type { IUser, FrontUser } from "../types";
import { MESSAGES, SEVERITY } from "../utils/constant";

export function useCreateUserToast(
  setToast: (toast: { severity: "success" | "error"; message: string } | null) => void
) {
  return useMutation({
    mutationFn: (user: Partial<IUser>) => createUser(user),
    onSuccess: () => {
      setToast({ severity: SEVERITY.SUCCESS, message: MESSAGES.USER_CREATED_SUCCESS });
    },
    onError: () => {
      setToast({ severity: SEVERITY.ERROR, message: MESSAGES.USER_CREATED_ERROR });
    },
  });
}

export function useLoginUserToast(
  setToast: (toast: { severity: "success" | "error"; message: string } | null) => void,
  setAuth: (auth: { user: FrontUser; token: string }) => void
) {
  return useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      login(data.username, data.password),

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setAuth({ user: data.user, token: data.token });

      setToast({
        severity: SEVERITY.SUCCESS,
        message: MESSAGES.LOGIN_SUCCESS,
      });
    },

    onError: () => {
      setToast({
        severity: SEVERITY.ERROR,
        message: MESSAGES.WRONG_CREDENTIALS,
      });
    },
  });
}