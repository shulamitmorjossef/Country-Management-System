import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import countryRoutes from "./routes/country.routes";
import userRoutes from "./routes/user.routes";
import "../config/dotenv";
import { errorHandler } from "../middlewares/error.middleware";
import path from "path";


const app = express();
const PORT = process.env.PORT || 3000;

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(cors());
app.use(express.json());

app.use("/api/countries", countryRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);


mongoose.connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection error:", err));
