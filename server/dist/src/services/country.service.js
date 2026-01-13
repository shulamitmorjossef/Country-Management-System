"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCountriesFromExternal = void 0;
exports.createCountry = createCountry;
exports.getAllCountries = getAllCountries;
exports.getCountryById = getCountryById;
exports.updateCountry = updateCountry;
exports.deleteCountry = deleteCountry;
const country_model_1 = __importDefault(require("../models/country.model"));
const fetchCountries_1 = require("../../utils/fetchCountries");
Object.defineProperty(exports, "fetchCountriesFromExternal", { enumerable: true, get: function () { return fetchCountries_1.fetchCountriesFromExternal; } });
const city_service_1 = require("./city.service");
const mongoose_1 = __importDefault(require("mongoose"));
async function createCountry(countryData) {
    const countryWithCities = { ...countryData, cities: [] };
    return country_model_1.default.create(countryWithCities);
}
async function getAllCountries() {
    const countries = await country_model_1.default.find({}).populate('cities');
    if (countries.length === 0) {
        const external = await (0, fetchCountries_1.fetchCountriesFromExternal)();
        const externalWithCities = external.map((c) => ({ ...c, cities: [] }));
        await country_model_1.default.insertMany(externalWithCities);
        return externalWithCities;
    }
    return countries;
}
async function getCountryById(id) {
    return country_model_1.default.findById(id).populate('cities');
}
async function updateCountry(id, updates) {
    const country = await country_model_1.default.findById(id).populate('cities');
    if (!country)
        return null;
    // Handle cities update
    if (updates.cities) {
        const existingCityIds = country.cities.map((c) => c._id.toString());
        const newCityIds = updates.cities.map((c) => c._id).filter((id) => mongoose_1.default.Types.ObjectId.isValid(id));
        // Remove cities not in the new list
        const citiesToRemove = existingCityIds.filter((id) => !newCityIds.includes(id));
        for (const cityId of citiesToRemove) {
            await (0, city_service_1.deleteCity)(cityId);
        }
        // Add or update cities
        const updatedCities = [];
        for (const cityData of updates.cities) {
            let city;
            if (mongoose_1.default.Types.ObjectId.isValid(cityData._id)) {
                // Existing city, update name if changed
                const existingCity = country.cities.find((c) => c._id.toString() === cityData._id);
                if (existingCity && existingCity.name !== cityData.name) {
                    city = await (0, city_service_1.updateCity)(cityData._id, cityData.name);
                }
                else {
                    city = existingCity;
                }
            }
            else {
                // New city, create it
                city = await (0, city_service_1.createCity)(id, cityData.name);
            }
            if (city)
                updatedCities.push(city._id);
        }
        updates.cities = updatedCities;
    }
    return country_model_1.default.findByIdAndUpdate(id, updates, { new: true }).populate('cities');
}
async function deleteCountry(id) {
    return country_model_1.default.findByIdAndDelete(id);
}
