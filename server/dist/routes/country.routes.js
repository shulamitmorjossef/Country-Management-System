"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const country_controller_1 = require("../controllers/country.controller");
const router = (0, express_1.Router)();
router.get("/update", country_controller_1.updateCountries);
router.get("/", country_controller_1.getCountries);
exports.default = router;
