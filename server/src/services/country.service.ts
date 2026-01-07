import axios from "axios";
import Country from "../models/country.model";
import { fetchCountriesFromExternal } from "../../utils/fetchCountries";


export { fetchCountriesFromExternal };


export async function createCountry(countryData: any) {
  return Country.create(countryData);
}

export async function getAllCountries() {
  const countries = await Country.find({});
  if (countries.length === 0) {
    const external = await fetchCountriesFromExternal();
    await Country.insertMany(external);
    return external;
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
