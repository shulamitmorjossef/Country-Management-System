import { Schema, model } from "mongoose";

const countrySchema = new Schema({
  name: { type: String, required: true },
  flag: String,
  population: Number,
  region: String,
},

{ versionKey: false }

);

const Country = model("Country", countrySchema);

export default Country;
