import { Schema, model } from "mongoose";

const citySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { versionKey: false }
);

const City = model("City", citySchema);

export default City;
