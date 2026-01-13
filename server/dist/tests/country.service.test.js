"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const country_service_1 = require("../src/services/country.service");
const country_model_1 = __importDefault(require("../src/models/country.model"));
const jest_setup_1 = require("./jest.setup");
beforeEach(() => {
    jest.clearAllMocks();
    const mockQuery = {
        populate: jest.fn().mockReturnThis(),
    };
    jest.spyOn(country_model_1.default, "find").mockReturnValue(mockQuery);
    jest.spyOn(country_model_1.default, "insertMany").mockResolvedValue([]);
});
describe("Country Service", () => {
    it("fetchCountriesFromExternal should map API data correctly", async () => {
        jest_setup_1.mockedAxios.get.mockResolvedValueOnce({
            data: [
                { name: { common: "Testland" }, flags: { svg: "flag.svg" }, population: 1000, region: "Europe" }
            ]
        });
        const countries = await (0, country_service_1.fetchCountriesFromExternal)();
        expect(countries[0].name).toBe("Testland");
        expect(countries[0].flag).toBe("flag.svg");
        expect(countries[0].population).toBe(1000);
        expect(countries[0].region).toBe("Europe");
    });
    it("getAllCountries inserts external if DB empty", async () => {
        const mockQuery = {
            populate: jest.fn().mockResolvedValue([]),
        };
        jest.spyOn(country_model_1.default, "find").mockReturnValue(mockQuery);
        jest.spyOn(country_model_1.default, "insertMany").mockResolvedValue([]);
        jest_setup_1.mockedAxios.get.mockResolvedValueOnce({ data: [] });
        const countries = await (0, country_service_1.getAllCountries)();
        expect(country_model_1.default.insertMany).toHaveBeenCalled();
    });
    it("createCountry should call Country.create", async () => {
        const spy = jest.spyOn(country_model_1.default, "create").mockResolvedValue({ name: "A" });
        const result = await (0, country_service_1.createCountry)({ name: "A" });
        expect(spy).toHaveBeenCalled();
        expect(result.name).toBe("A");
    });
});
