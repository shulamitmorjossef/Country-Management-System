"use strict";
/// <reference types="jest" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockedAxios = void 0;
const axios_1 = __importDefault(require("axios"));
jest.mock("axios");
exports.mockedAxios = axios_1.default;
