import { atom } from "recoil";
import type { FrontUser } from "../types";

export const authState = atom<{ user: FrontUser | null; token: string | null }>({
  key: "authState",
  default: {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token"),
  },
});
