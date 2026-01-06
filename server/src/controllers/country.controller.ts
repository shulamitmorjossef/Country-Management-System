import { Request, Response, NextFunction } from "express";
import {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
} from "../services/country.service";

import { catchAsync } from "../../middlewares/error.middleware";
 
export const create = catchAsync(async (req, res) => {
  const country = await createCountry(req.body);
  res.status(201).json(country);
});

export const getAll = catchAsync(async (req, res) => {
  const countries = await getAllCountries();
  res.json(countries);
});

export const getOne = catchAsync(async (req, res) => {
  const country = await getCountryById(req.params.id);
  if (!country) {
    res.status(404);
    throw new Error("Country not found");
  }
  res.json(country);
});

export const update = catchAsync(async (req, res) => {
  const updated = await updateCountry(req.params.id, req.body);
  if (!updated) {
    res.status(404);
    throw new Error("Country not found");
  }
  res.json(updated);
});

export const remove = catchAsync(async (req, res) => {
  const deleted = await deleteCountry(req.params.id);
  if (!deleted) {
    res.status(404);
    throw new Error("Country not found");
  }
  res.json({ message: "Deleted" });
});
