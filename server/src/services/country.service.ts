import Country from "../models/country.model";
import { fetchCountriesFromExternal } from "../../utils/fetchCountries";
import { createCity, updateCity, deleteCity } from "./city.service";
import mongoose from "mongoose";


export { fetchCountriesFromExternal };

export async function createCountry(countryData: any) {
  const countryWithCities = { ...countryData, cities: [] };
  return Country.create(countryWithCities);
}

export async function getAllCountries() {
  const countries = await Country.find({}).populate('cities');
  if (countries.length === 0) {
    const external = await fetchCountriesFromExternal();
    const externalWithCities = external.map((c: any) => ({ ...c, cities: [] }));
    await Country.insertMany(externalWithCities);
    return externalWithCities;
  }

  return countries;
}

export async function getCountryById(id: string) {
  return Country.findById(id).populate('cities');
}

export async function updateCountry(id: string, updates: any) {
  const country = await Country.findById(id).populate('cities') as any;
  if (!country) return null;

  if (updates.cities) {
    const existingCityIds = country.cities.map((c: any) => c._id.toString());
    const newCityIds = updates.cities.map((c: any) => c._id).filter((id: string) => mongoose.Types.ObjectId.isValid(id));

    const citiesToRemove = existingCityIds.filter((id: string) => !newCityIds.includes(id));
    for (const cityId of citiesToRemove) {
      await deleteCity(cityId);
    }

    const updatedCities = [];
    for (const cityData of updates.cities) {
      let city;
      if (mongoose.Types.ObjectId.isValid(cityData._id)) {
        const existingCity = country.cities.find((c: any) => c._id.toString() === cityData._id);
        if (existingCity && existingCity.name !== cityData.name) {
          city = await updateCity(cityData._id, cityData.name);
        } else {
          city = existingCity;
        }
      } else {
        city = await createCity(id, cityData.name);
      }
      if (city) updatedCities.push(city._id);
    }

    updates.cities = updatedCities;
  }

  return Country.findByIdAndUpdate(id, updates, { new: true }).populate('cities');
}

export async function deleteCountry(id: string) {
  return Country.findByIdAndDelete(id);
}

