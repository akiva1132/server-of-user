"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router/router"));
const app = (0, express_1.default)();
const chalk_1 = __importDefault(require("chalk"));
const morgan_1 = __importDefault(require("./logger/morgan"));
const cors_1 = __importDefault(require("./cors/cors"));
const handleErrors_1 = require("./utils/handleErrors");
app.use(morgan_1.default);
app.use(cors_1.default);
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(router_1.default);
app.use(handleErrors_1.handleServerError);
const PORT = 8181;
app.listen(PORT, () => {
    console.log(chalk_1.default.blueBright(`Server listening on port: ${PORT}`));
});
