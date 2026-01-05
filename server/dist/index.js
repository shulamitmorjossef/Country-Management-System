"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const country_routes_1 = __importDefault(require("./routes/country.routes"));
require("./config/dotenv");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/countries", country_routes_1.default);
mongoose_1.default.connect(process.env.MONGO_URI || "")
    .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
    .catch(err => console.error("MongoDB connection error:", err));
