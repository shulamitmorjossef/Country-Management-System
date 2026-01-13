"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCity = createCity;
exports.getCities = getCities;
exports.getCityById = getCityById;
exports.updateCity = updateCity;
exports.deleteCity = deleteCity;
const city_model_1 = __importDefault(require("../models/city.model"));
const country_model_1 = __importDefault(require("../models/country.model"));
async function createCity(countryId, name) {
    const city = await city_model_1.default.create({ name });
    await country_model_1.default.findByIdAndUpdate(countryId, { $push: { cities: city._id } });
    return city;
}
async function getCities(countryId) {
    if (countryId) {
        const country = await country_model_1.default.findById(countryId).populate("cities");
        return country?.cities || [];
    }
    return city_model_1.default.find({});
}
async function getCityById(id) {
    return city_model_1.default.findById(id);
}
async function updateCity(id, name) {
    return city_model_1.default.findByIdAndUpdate(id, { name }, { new: true });
}
async function deleteCity(id) {
    const city = await city_model_1.default.findByIdAndDelete(id);
    if (city) {
        await country_model_1.default.updateMany({ cities: id }, { $pull: { cities: id } });
    }
    return city;
}
