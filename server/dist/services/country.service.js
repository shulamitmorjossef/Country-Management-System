"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAndSaveCountries = fetchAndSaveCountries;
exports.getCountriesFromDB = getCountriesFromDB;
const axios_1 = __importDefault(require("axios"));
const country_model_1 = __importDefault(require("../models/country.model"));
const API_URL = "https://restcountries.com/v3.1/all";
async function fetchAndSaveCountries() {
    try {
        const { data } = await axios_1.default.get(API_URL);
        const countries = data.map((c) => ({
            name: c.name.common,
            flag: c.flags?.svg || "",
            population: c.population,
            region: c.region,
        }));
        await country_model_1.default.deleteMany({});
        await country_model_1.default.insertMany(countries);
        return countries;
    }
    catch (error) {
        throw new Error("Failed to fetch countries");
    }
}
async function getCountriesFromDB() {
    return country_model_1.default.find({});
}
