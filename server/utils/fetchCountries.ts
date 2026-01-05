import axios from "axios";

const API_URL =
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region";

export async function fetchCountriesFromExternal() {
  const { data } = await axios.get(API_URL);

  return data.map((c: any) => ({
    name: c.name.common,
    flag: c.flags?.svg || "",
    population: c.population || 0,
    region: c.region || "Unknown",
  }));
}
