import request from "supertest";
import express from "express";
import countryRoutes from "../src/routes/country.routes";
import Country from "../src/models/country.model";

const app = express();
app.use(express.json());
app.use("/api/countries", countryRoutes);

jest.mock("../src/models/country.model");

describe("Country Routes", () => {
  it("GET /api/countries returns countries", async () => {
    const mockQuery = {
      populate: jest.fn().mockResolvedValue([{ name: "Testland" }]),
    };
    (Country.find as jest.Mock).mockReturnValue(mockQuery);
    const res = await request(app).get("/api/countries");
    expect(res.status).toBe(200);
    expect(res.body[0].name).toBe("Testland");
  });

  it("POST /api/countries creates country", async () => {
    (Country.create as jest.Mock).mockResolvedValue({ name: "NewCountry" });
    const res = await request(app).post("/api/countries").send({ name: "NewCountry" });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("NewCountry");
  });

  it("GET /api/countries/:id returns country", async () => {
    (Country.findById as jest.Mock).mockResolvedValue({ name: "SingleLand" });
    const res = await request(app).get("/api/countries/123");
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("SingleLand");
  });
});
