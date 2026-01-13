import axios from "axios";
import type { City } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/cities",
});

export async function getCitiesByCountryId(countryId: string) {
  const res = await api.get(`?countryId=${countryId}`);
  return res.data as City[];
}

export async function createCity(countryId: string, name: string) {
  const res = await api.post("/", { countryId, name });
  return res.data;
}

export async function updateCity(id: string, name: string) {
  const res = await api.put(`/${id}`, { name });
  return res.data;
}

export async function deleteCity(id: string) {
  const res = await api.delete(`/${id}`);
  return res.data;
}
