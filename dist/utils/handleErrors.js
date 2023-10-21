"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerError = exports.handleJsonfileError = exports.handleError = void 0;
const chalk_1 = __importDefault(require("chalk"));
const handleError = (res, error, status = 400) => {
    console.log(chalk_1.default.redBright(error.message));
    return res.status(status).send(error.message);
};
exports.handleError = handleError;
const handleJsonfileError = (error) => {
    if (error instanceof Error)
        return Promise.reject(error);
    console.log(chalk_1.default.redBright(error));
    return Promise.reject(new Error("Something went wong!"));
};
exports.handleJsonfileError = handleJsonfileError;
const handleServerError = (error, req, res, next) => {
    console.log(chalk_1.default.redBright(error.message));
    res.status(500).send(error.message);
};
exports.handleServerError = handleServerError;
