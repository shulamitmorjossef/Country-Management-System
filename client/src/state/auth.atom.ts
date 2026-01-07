import { atom } from "recoil";
import type { IUser } from "../types";

export const authState = atom<{
  user: IUser | null;
  token: string | null;
}>({
  key: "authState",
  default: { user: null, token: null },
});
