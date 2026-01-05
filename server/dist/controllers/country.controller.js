"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCountries = updateCountries;
exports.getCountries = getCountries;
const country_service_1 = require("../services/country.service");
async function updateCountries(req, res) {
    try {
        const countries = await (0, country_service_1.fetchAndSaveCountries)();
        res.json(countries);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update countries" });
    }
}
async function getCountries(req, res) {
    try {
        const countries = await (0, country_service_1.getCountriesFromDB)();
        res.json(countries);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get countries" });
    }
}
