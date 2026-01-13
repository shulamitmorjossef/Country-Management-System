import { createCountry, getAllCountries, getCountryById, updateCountry, deleteCountry, fetchCountriesFromExternal } from "../src/services/country.service";
import Country from "../src/models/country.model";
import { mockedAxios } from "./jest.setup";

beforeEach(() => {
  jest.clearAllMocks();
  const mockQuery = {
    populate: jest.fn().mockReturnThis(),
  };
  jest.spyOn(Country, "find").mockReturnValue(mockQuery as any);
  jest.spyOn(Country, "insertMany").mockResolvedValue([]);
});

describe("Country Service", () => {
  it("fetchCountriesFromExternal should map API data correctly", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { name: { common: "Testland" }, flags: { svg: "flag.svg" }, population: 1000, region: "Europe" }
      ]
    });

    const countries = await fetchCountriesFromExternal();
    expect(countries[0].name).toBe("Testland");
    expect(countries[0].flag).toBe("flag.svg");
    expect(countries[0].population).toBe(1000);
    expect(countries[0].region).toBe("Europe");
  });

  it("getAllCountries inserts external if DB empty", async () => {
    const mockQuery = {
      populate: jest.fn().mockResolvedValue([]),
    };
    jest.spyOn(Country, "find").mockReturnValue(mockQuery as any);
    jest.spyOn(Country, "insertMany").mockResolvedValue([]);
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    const countries = await getAllCountries();
    expect(Country.insertMany).toHaveBeenCalled();
  });

  it("createCountry should call Country.create", async () => {
    const spy = jest.spyOn(Country, "create").mockResolvedValue({ name: "A" } as any);
    const result = await createCountry({ name: "A" });
    expect(spy).toHaveBeenCalled();
    expect(result.name).toBe("A");
  });
});
