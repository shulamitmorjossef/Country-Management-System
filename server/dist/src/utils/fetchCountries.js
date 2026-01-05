"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCountriesFromExternal = fetchCountriesFromExternal;
const axios_1 = __importDefault(require("axios"));
const API_URL = "https://restcountries.com/v3.1/all?fields=name,flags,population,region";
async function fetchCountriesFromExternal() {
    const { data } = await axios_1.default.get(API_URL);
    return data.map((c) => ({
        name: c.name.common,
        flag: c.flags?.svg || "",
        population: c.population || 0,
        region: c.region || "Unknown",
    }));
}
