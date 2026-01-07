import { useMutation } from "@tanstack/react-query";
import { createUser } from "./users";
import type { IUser } from "../types";
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
