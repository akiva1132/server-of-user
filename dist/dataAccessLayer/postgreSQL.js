"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductFromPG = exports.getProductsFromPG = exports.connectToPG = void 0;
const axios_1 = __importDefault(require("axios"));
const BASE_URL = "http://127.0.0.1:9191";
axios_1.default.defaults.headers.origin = "http://127.0.0.1:8181";
const connectToPG = async () => {
    try {
        const { data: message } = await axios_1.default.get(`${BASE_URL}`);
        return message;
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.connectToPG = connectToPG;
const getProductsFromPG = async () => {
    try {
        const products = await axios_1.default.get(`${BASE_URL}/api/products`);
        return products;
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.getProductsFromPG = getProductsFromPG;
const getProductFromPG = async (product) => {
    try {
        const { data: productFromPG } = await axios_1.default.get(`${BASE_URL}/api/products/${product}`);
        return productFromPG;
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.getProductFromPG = getProductFromPG;
