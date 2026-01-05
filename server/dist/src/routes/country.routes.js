"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const country_controller_1 = require("../controllers/country.controller");
const router = (0, express_1.Router)();
// CREATE
router.post("/", country_controller_1.create);
// READ ALL  (DB first, then API fallback)
router.get("/", country_controller_1.getAll);
// READ ONE
router.get("/:id", country_controller_1.getOne);
// UPDATE
router.put("/:id", country_controller_1.update);
// DELETE
router.delete("/:id", country_controller_1.remove);
exports.default = router;
