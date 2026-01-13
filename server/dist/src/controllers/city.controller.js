"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getOne = exports.getAll = exports.create = void 0;
const CityService = __importStar(require("../services/city.service"));
const error_middleware_1 = require("../../middlewares/error.middleware");
exports.create = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const { countryId, name } = req.body;
    const city = await CityService.createCity(countryId, name);
    res.status(201).json(city);
});
exports.getAll = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const { countryId } = req.query;
    const cities = await CityService.getCities(countryId);
    res.json(cities);
});
exports.getOne = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const city = await CityService.getCityById(req.params.id);
    if (!city) {
        res.status(404);
        throw new Error("City not found");
    }
    res.json(city);
});
exports.update = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const updated = await CityService.updateCity(req.params.id, req.body.name);
    if (!updated) {
        res.status(404);
        throw new Error("City not found");
    }
    res.json(updated);
});
exports.remove = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const deleted = await CityService.deleteCity(req.params.id);
    if (!deleted) {
        res.status(404);
        throw new Error("City not found");
    }
    res.json({ message: "Deleted" });
});
