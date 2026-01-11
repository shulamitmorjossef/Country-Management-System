import axios from "axios";
import type { FrontUser, IUser } from "../types";

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

export async function updateUser(
  userId: string,
  data: Partial<FrontUser>,
  token: string
) {
  const res = await api.put(`/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function forgotPassword(email: string) {
  return api.post("/forgot-password", { email });
}

export async function resetPassword(token: string, password: string) {
  return api.post(`/reset-password/${token}`, { password });
}