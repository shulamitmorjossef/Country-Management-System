import City from "../models/city.model";
import Country from "../models/country.model";

export async function createCity(countryId: string, name: string) {
  const city = await City.create({ name });
  await Country.findByIdAndUpdate(countryId, { $push: { cities: city._id } });
  return city;
}

export async function getCities(countryId?: string) {
  if (countryId) {
    const country = await Country.findById(countryId).populate("cities");
    return country?.cities || [];
  }
  return City.find({});
}

export async function getCityById(id: string) {
  return City.findById(id);
}

export async function updateCity(id: string, name: string) {
  return City.findByIdAndUpdate(id, { name }, { new: true });
}

export async function deleteCity(id: string) {
  const city = await City.findByIdAndDelete(id);
  if (city) {
    await Country.updateMany({ cities: id }, { $pull: { cities: id } });
  }
  return city;
}
