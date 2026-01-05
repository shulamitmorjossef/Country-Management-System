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
const fetchCountries_1 = require("../utils/fetchCountries");
Object.defineProperty(exports, "fetchCountriesFromExternal", { enumerable: true, get: function () { return fetchCountries_1.fetchCountriesFromExternal; } });
async function createCountry(countryData) {
    return country_model_1.default.create(countryData);
}
async function getAllCountries() {
    const countries = await country_model_1.default.find({});
    if (countries.length === 0) {
        const external = await (0, fetchCountries_1.fetchCountriesFromExternal)();
        await country_model_1.default.insertMany(external);
        return external;
    }
    return countries;
}
async function getCountryById(id) {
    return country_model_1.default.findById(id);
}
async function updateCountry(id, updates) {
    return country_model_1.default.findByIdAndUpdate(id, updates, { new: true });
}
async function deleteCountry(id) {
    return country_model_1.default.findByIdAndDelete(id);
}
