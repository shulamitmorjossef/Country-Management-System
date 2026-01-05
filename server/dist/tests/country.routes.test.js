"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const country_routes_1 = __importDefault(require("../src/routes/country.routes"));
const country_model_1 = __importDefault(require("../src/models/country.model"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/countries", country_routes_1.default);
jest.mock("../src/models/country.model");
describe("Country Routes", () => {
    it("GET /api/countries returns countries", async () => {
        country_model_1.default.find.mockResolvedValue([{ name: "Testland" }]);
        const res = await (0, supertest_1.default)(app).get("/api/countries");
        expect(res.status).toBe(200);
        expect(res.body[0].name).toBe("Testland");
    });
    it("POST /api/countries creates country", async () => {
        country_model_1.default.create.mockResolvedValue({ name: "NewCountry" });
        const res = await (0, supertest_1.default)(app).post("/api/countries").send({ name: "NewCountry" });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe("NewCountry");
    });
    it("GET /api/countries/:id returns country", async () => {
        country_model_1.default.findById.mockResolvedValue({ name: "SingleLand" });
        const res = await (0, supertest_1.default)(app).get("/api/countries/123");
        expect(res.status).toBe(200);
        expect(res.body.name).toBe("SingleLand");
    });
});
