import { atom } from "recoil";
import type { IUser } from "../types";

export const authState = atom<{ user: IUser | null; token: string | null }>({
  key: "authState",
  default: {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token"),
  },
});
