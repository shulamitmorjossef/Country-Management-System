import axios from "axios";
import type { IUser } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/users",
});

export async function createUser(userData: Partial<IUser>) {
  const res = await api.post("/", userData);
  return res.data;
}
