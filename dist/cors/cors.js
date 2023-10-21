"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const whiteList = [
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5500",
    "http://localhost:3000",
];
const corsOptions = {
    origin: whiteList,
};
const corsHandler = (0, cors_1.default)(corsOptions);
exports.default = corsHandler;
