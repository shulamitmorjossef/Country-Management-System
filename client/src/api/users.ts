import axios from "axios";
import type { IUser } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/users",
});

export async function createUser(userData: Partial<IUser>) {
  const res = await api.post("/", userData);
  return res.data;
}


export async function login(username: string, password: string) {
  const res = await api.post("/login", { username, password });
  return res.data; 
}