"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const timeService_1 = require("../utils/timeService");
const chalk_1 = __importDefault(require("chalk"));
const morganLogger = (0, morgan_1.default)((tokens, req, res) => {
    const status = tokens.status(req, res);
    const morganString = [
        (0, timeService_1.morganTime)(),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        "-",
        tokens["response-time"](req, res),
        "MS",
    ].join(" ");
    if (+status >= 400)
        return chalk_1.default.redBright(morganString);
    return chalk_1.default.cyanBright(morganString);
});
exports.default = morganLogger;
