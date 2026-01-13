"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getOne = exports.getAll = exports.create = void 0;
const country_service_1 = require("../services/country.service");
const error_middleware_1 = require("../../middlewares/error.middleware");
exports.create = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const country = await (0, country_service_1.createCountry)(req.body);
    res.status(201).json(country);
});
exports.getAll = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const countries = await (0, country_service_1.getAllCountries)();
    res.json(countries);
});
exports.getOne = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const country = await (0, country_service_1.getCountryById)(req.params.id);
    if (!country) {
        res.status(404);
        throw new Error("Country not found");
    }
    res.json(country);
});
exports.update = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const updated = await (0, country_service_1.updateCountry)(req.params.id, req.body);
    if (!updated) {
        res.status(404);
        throw new Error("Country not found");
    }
    res.json(updated);
});
exports.remove = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const deleted = await (0, country_service_1.deleteCountry)(req.params.id);
    if (!deleted) {
        res.status(404);
        throw new Error("Country not found");
    }
    res.json({ message: "Deleted" });
});
