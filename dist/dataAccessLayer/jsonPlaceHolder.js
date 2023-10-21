"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDataToJsonPlaceHolder = void 0;
const axios_1 = __importDefault(require("axios"));
const DB_URL = "https://jsonplaceholder.typicode.com";
const addDataToJsonPlaceHolder = async (dataFromClient, collection) => {
    try {
        const { data } = await axios_1.default.post(`${DB_URL}/${collection}`, dataFromClient);
        return Promise.resolve({ data });
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.addDataToJsonPlaceHolder = addDataToJsonPlaceHolder;
