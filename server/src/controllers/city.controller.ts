import { Request, Response } from "express";
import * as CityService from "../services/city.service";
import { catchAsync } from "../../middlewares/error.middleware";

export const create = catchAsync(async (req: Request, res: Response) => {
  const { countryId, name } = req.body;
  const city = await CityService.createCity(countryId, name);
  res.status(201).json(city);
});

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const { countryId } = req.query;
  const cities = await CityService.getCities(countryId as string | undefined);
  res.json(cities);
});

export const getOne = catchAsync(async (req: Request, res: Response) => {
  const city = await CityService.getCityById(req.params.id);
  if (!city) {
    res.status(404);
    throw new Error("City not found");
  }
  res.json(city);
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const updated = await CityService.updateCity(req.params.id, req.body.name);
  if (!updated) {
    res.status(404);
    throw new Error("City not found");
  }
  res.json(updated);
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const deleted = await CityService.deleteCity(req.params.id);
  if (!deleted) {
    res.status(404);
    throw new Error("City not found");
  }
  res.json({ message: "Deleted" });
});
