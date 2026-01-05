import { atom } from "recoil";

export const navbarTitleState = atom<string>({
  key: "navbarTitleState",
  default: "Country Management System",
});
