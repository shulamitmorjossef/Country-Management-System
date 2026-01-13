import Country from "../models/country.model";
import { fetchCountriesFromExternal } from "../../utils/fetchCountries";


export { fetchCountriesFromExternal };

export async function createCountry(countryData: any) {
  const countryWithCities = { ...countryData, cities: [] };
  return Country.create(countryWithCities);
}

export async function getAllCountries() {
  const countries = await Country.find({});
  if (countries.length === 0) {
    const external = await fetchCountriesFromExternal();
    const externalWithCities = external.map((c: any) => ({ ...c, cities: [] }));
    await Country.insertMany(externalWithCities);
    return externalWithCities;
  }

  return countries;
}

export async function getCountryById(id: string) {
  return Country.findById(id);
}

export async function updateCountry(id: string, updates: any) {
  return Country.findByIdAndUpdate(id, updates, { new: true });
}

export async function deleteCountry(id: string) {
  return Country.findByIdAndDelete(id);
}

