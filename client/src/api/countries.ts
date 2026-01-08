import axios from "axios";
import type { Country } from "../types";
// import { authState } from "../state/auth.atom";
// import { useRecoilValue } from "recoil";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/countries",

});

// export function useApi() {
//   const auth = useRecoilValue(authState);

//   const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL + "/countries",
//     headers: {
//       Authorization: `Bearer ${auth.token}`,
//     },
//   });

//   return api;
// }

export async function getCountries() {
  // const api = useApi();
  const res = await api.get("/");
  return res.data;
}

export async function getCountryById(id: string) {
  const res = await api.get(`/${id}`);
  return res.data;
}

export async function createCountry(countryData: Country) {
  const res = await api.post("/", countryData);
  return res.data;
}

export async function updateCountry(id: string, updates: Country) {
  const res = await api.put(`/${id}`, updates);
  return res.data;
}

export async function deleteCountry(id: string) {
  const res = await api.delete(`/${id}`);
  return res.data;
}
