import { Schema, Types, model } from "mongoose";

const countrySchema = new Schema({
  name: { type: String, required: true },
  flag: String,
  population: Number,
  region: String,
  cities: [{ type: Types.ObjectId, ref: "City" }], 
},

{ versionKey: false }

);

const Country = model("Country", countrySchema);

export default Country;
