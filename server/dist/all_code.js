"use strict";
// // ========== index.ts ==========
// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import countryRoutes from "./routes/country.routes";
// import "./config/dotenv";
// const app = express();
// const PORT = process.env.PORT || 3000;
// app.use(cors());
// app.use(express.json());
// app.use("/api/countries", countryRoutes);
// mongoose.connect(process.env.MONGO_URI || "")
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch(err => console.error("MongoDB connection error:", err));
// // ========== config/dotenv.ts ==========
// import dotenv from "dotenv";
// dotenv.config();
// // ========== controllers/country.controller.ts ==========
// import { Request, Response } from "express";
// import {
//   createCountry,
//   getAllCountries,
//   getCountryById,
//   updateCountry,
//   deleteCountry,
// } from "../services/country.service";
// export async function create(req: Request, res: Response) {
//   try {
//     const country = await createCountry(req.body);
//     res.status(201).json(country);
//   } catch {
//     res.status(500).json({ message: "Failed to create country" });
//   }
// }
// export async function getAll(req: Request, res: Response) {
//   try {
//     const countries = await getAllCountries();
//     res.json(countries);
//   } catch {
//     res.status(500).json({ message: "Failed to get countries" });
//   }
// }
// export async function getOne(req: Request, res: Response) {
//   try {
//     const country = await getCountryById(req.params.id);
//     if (!country) return res.status(404).json({ message: "Not found" });
//     res.json(country);
//   } catch {
//     res.status(500).json({ message: "Failed to get country" });
//   }
// }
// export async function update(req: Request, res: Response) {
//   try {
//     const updated = await updateCountry(req.params.id, req.body);
//     if (!updated) return res.status(404).json({ message: "Not found" });
//     res.json(updated);
//   } catch {
//     res.status(500).json({ message: "Failed to update country" });
//   }
// }
// export async function remove(req: Request, res: Response) {
//   try {
//     const deleted = await deleteCountry(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Not found" });
//     res.json({ message: "Deleted" });
//   } catch {
//     res.status(500).json({ message: "Failed to delete country" });
//   }
// }
// // ========== models/country.model.ts ==========
// import { Schema, model } from "mongoose";
// const countrySchema = new Schema({
//   name: { type: String, required: true },
//   flag: String,
//   population: Number,
//   region: String,
// },
// { versionKey: false }
// );
// const Country = model("Country", countrySchema);
// export default Country;
// // ========== routes/country.routes.ts ==========
// import { Router } from "express";
// import {
//   create,
//   getAll,
//   getOne,
//   update,
//   remove,
// } from "../controllers/country.controller";
// const router = Router();
// // CREATE
// router.post("/", create);
// // READ ALL  (DB first, then API fallback)
// router.get("/", getAll);
// // READ ONE
// router.get("/:id", getOne);
// // UPDATE
// router.put("/:id", update);
// // DELETE
// router.delete("/:id", remove);
// export default router;
// // ========== services/country.service.ts ==========
// import axios from "axios";
// import Country from "../models/country.model";
// const API_URL =
//   "https://restcountries.com/v3.1/all?fields=name,flags,population,region";
// export async function fetchCountriesFromExternal() {
//   const { data } = await axios.get(API_URL);
//   return data.map((c: any) => ({
//     name: c.name.common,
//     flag: c.flags?.svg || "",
//     population: c.population || 0,
//     region: c.region || "Unknown",
//   }));
// }
// // ---------- CREATE ----------
// export async function createCountry(countryData: any) {
//   return Country.create(countryData);
// }
// // ---------- READ ALL ----------
// export async function getAllCountries() {
//   const countries = await Country.find({});
//   if (countries.length === 0) {
//     const external = await fetchCountriesFromExternal();
//     await Country.insertMany(external);
//     return external;
//   }
//   return countries;
// }
// // ---------- READ BY ID ----------
// export async function getCountryById(id: string) {
//   return Country.findById(id);
// }
// // ---------- UPDATE ----------
// export async function updateCountry(id: string, updates: any) {
//   return Country.findByIdAndUpdate(id, updates, { new: true });
// }
// // ---------- DELETE ----------
// export async function deleteCountry(id: string) {
//   return Country.findByIdAndDelete(id);
// }
